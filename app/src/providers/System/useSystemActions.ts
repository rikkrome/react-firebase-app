/***
* ==============================================================================
*	useSystemActions.ts
* React Custom Hook
*
* System Actions to let the user know bits of info. An example is to let the user know that a background proccess is done.
* ==============================================================================
*/
import { useDispatch, useSelector } from '../Store';
import { PUSH_ALERT, CLEAR_ALL_ALERTS } from './constants';

const useSystemActions = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector((state: any) => state.system);

  /* 
   * System Notifications - display alert banner 
   * @param {string} text - alert text
   * @param {string} type - alert color type
   * */
  const PushAlert = (text: string, type: string) => {
    // add alert to stack.
    if (alerts && Array.isArray(alerts)) {
      alerts.push({ text, type })
    }
    dispatch({ type: PUSH_ALERT, payload: { alerts } })
  }

  const ClearAllAlerts = () => {
    dispatch({ type: CLEAR_ALL_ALERTS, payload: null })
  }

  return {
    PushAlert,
    ClearAllAlerts
  }
}

export default useSystemActions;
