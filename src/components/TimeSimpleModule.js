import {useSelector} from "react-redux";
import {selectDarkmode} from "../features/darkmode/darkmodeSlice";
const TimeSimpleModule = ({val, type, total}) => {
  const darkmode = useSelector(selectDarkmode);
  const theme = darkmode ? " darkmode" : "";
  return (
    <div className={"timebox" + theme}>
      {val === 0 ? (
        <></>
      ) : (
        <p>
          {val}
          {type}
        </p>
      )}
    </div>
  );
};

export default TimeSimpleModule;
