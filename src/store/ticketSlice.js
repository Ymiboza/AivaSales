import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchTicketsData from "../requests/requests";

export const fetchTickets = createAsyncThunk(
  "ticket/ticketFetch",
  async (_, { rejectWithValue }) => {
    try {
      const tickets = await fetchTicketsData();
      return tickets;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ticketSlice = createSlice({
  name: "aviaSales",
  initialState: {
    ticket: [],
    status: null,
    error: null,
    count: 5,
    checkList: [
      { id: 0, checked: false, text: "Все" },
      { id: 1, checked: true, text: "Без пересадок", stops: 0 },
      { id: 2, checked: false, text: "1 пересадка", stops: 1 },
      { id: 3, checked: false, text: "2 пересадки", stops: 2 },
      { id: 4, checked: false, text: "3 пересадки", stops: 3 },
    ],
    filter: [
      { id: 1, active: "outlined", text: "Самый дешевый" },
      { id: 2, active: "outlined", text: "Самый быстрый" },
      { id: 3, active: "outlined", text: "Оптимальный" },
    ],
    stop: false,
  },
  reducers: {
    handleChecked(state, action) {
      const { payload } = action;

      const allChecked = state.checkList[0].checked;

      if (payload === 0) {
        state.checkList.forEach((box) => {
          box.checked = !allChecked;
        });
      } else {
        const currentBox = state.checkList.find((box) => box.id === payload);

        if (currentBox) {
          currentBox.checked = !currentBox.checked;
        }

        const otherBoxes = state.checkList.slice(1).every((box) => box.checked);

        state.checkList[0].checked = otherBoxes;
      }
    },
    handleChange(state, action) {
      state.filter.forEach((item) => {
        if (item.id === action.payload) {
          item.active = item.active === "outlined" ? "contained" : "outlined";
        } else {
          item.active = "outlined";
        }
        if (state.filter[0].active === "contained") {
          state.ticket.sort((a, b) => a.price - b.price);
        }
        if (state.filter[1].active === "contained") {
          state.ticket.sort((a, b) => {
            const durationA = a.segments.reduce(
              (acc, segment) => acc + segment.duration,
              0
            );
            const durationB = b.segments.reduce(
              (acc, segment) => acc + segment.duration,
              0
            );
            return durationA - durationB;
          });
        }
        if (state.filter[2].active === "contained") {
          state.ticket = state.ticket.slice().sort((a, b) => {
            const totalValueA =
              a.price +
              a.segments.reduce((acc, segment) => acc + segment.duration, 0);
            const totalValueB =
              b.price +
              b.segments.reduce((acc, segment) => acc + segment.duration, 0);
            return totalValueA - totalValueB;
          });
        }
      });
    },
    handleShowMore(state) {
      state.count += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = "resolved";
        state.ticket = action.payload.tickets;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { handleChecked, handleChange, handleShowMore } =
  ticketSlice.actions;
export default ticketSlice.reducer;
