import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import ExitIcon from "assets/icons/exit-icon";
import Button from "components/Button";
import { ButtonVariant } from "components/Button/enums";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectToast } from "store/toast/selectors/toast";
import { closeToast } from "store/toast/slices/toast";
import "./Toast.scss";
import { TOAST_AUTO_HIDE_DURATION } from "./constants";

const Toast = () => {
  const {
    isOpen,
    message,
    title,
    type,
    displayType,
    displayCloseBtn,
    autoHide,
    closeOnRouteChange,
  } = useAppSelector(selectToast);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleClose = () => dispatch(closeToast());

  useEffect(() => {
    if (closeOnRouteChange) handleClose();
  }, [location.pathname]);

  return (
    <div className="toast" data-testid="toast">
      <Snackbar
        autoHideDuration={autoHide ? TOAST_AUTO_HIDE_DURATION : null}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ClickAwayListenerProps={{
          touchEvent: false,
          mouseEvent: false,
        }}
      >
        <Alert severity={type} icon={false}>
          <div>
            {displayType && (
              <p
                className="toast__type paragraph1-bold"
                data-testid="toast-type"
              >
                {title}
              </p>
            )}
            <p className="paragraph1-bold" data-testid="toast-message">
              {message}
            </p>
          </div>
          {displayCloseBtn && (
            <Button
              onClick={handleClose}
              icon={<ExitIcon />}
              variant={ButtonVariant.icon}
              testId="toast-close-button"
              ariaLabel="Close notification"
              className="toast__close-button"
            />
          )}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
