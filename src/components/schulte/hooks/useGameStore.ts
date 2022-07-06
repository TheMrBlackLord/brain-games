import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";

const useGameStore = () => {
   const dispatch = useDispatch<AppDispatch>();
   const tableSize = useSelector((state: RootState) => state.schulte.tableSize);
   const isGameStarted = useSelector((state: RootState) => state.schulte.isGameStarted);
   const cellStyleSize = useSelector((state: RootState) => state.schulte.cellStyleSize);
   const cellFontSize = useSelector((state: RootState) => state.schulte.cellFontSize);

   return {
      dispatch,
      tableSize,
      isGameStarted,
      cellStyleSize,
      cellFontSize,
   }
}

export default useGameStore;
