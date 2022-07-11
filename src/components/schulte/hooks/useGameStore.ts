
import { useAppDispatch, useAppSelector } from "../../../hooks";

const useGameStore = () => {
   const dispatch = useAppDispatch();
   const state = useAppSelector((state) => state.schulte);

   return {
      dispatch,
      ...state
   };
}

export default useGameStore;
