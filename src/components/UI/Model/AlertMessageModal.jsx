/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../../store/actions';

// eslint-disable-next-line no-unused-vars
const AlertMessageModal = props => {
  const { title, message, notifyType, redirectURL, buttonClick, withButton } = useSelector(
    state => state.modal,
  );

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <div
        className="modal fade show"
        id="add-suc"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="enterOTP"
        style={{ display: 'block', zIndex: 2000 }}
        onClick={() => {
          if (withButton !== false) {
            if (redirectURL !== undefined && redirectURL !== '') {
              history.push(redirectURL);
            }
            if (buttonClick) {
              buttonClick();
            }
            dispatch(hideModal());
          }
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered m-bottom-modal"
          role="document"
          onClick={e => e.stopPropagation()}
        >
          <div
            className={
              notifyType === 2 || notifyType === 0
                ? 'modal-content text-center animated bounceIn'
                : 'modal-content text-center animated shake'
            }
          >
            <div className="modal-header">
              {(title !== undefined || title != null || title !== '') && (
                <h5 className="modal-title text-center w-100" id="">
                  {title}
                </h5>
              )}
            </div>
            <div className="modal-body text-center">
              <div className="f-modal-alert">
                {notifyType === 1 ? (
                  <div className="f-modal-icon f-modal-error animate">
                    <span className="f-modal-x-mark">
                      <span className="f-modal-line f-modal-left animateXLeft" />
                      <span className="f-modal-line f-modal-right animateXRight" />
                    </span>
                    <div className="f-modal-placeholder" />
                    <div className="f-modal-fix" />
                  </div>
                ) : notifyType === 2 ? (
                  <div className="f-modal-icon f-modal-success animate">
                    <span className="f-modal-line f-modal-tip animateSuccessTip" />
                    <span className="f-modal-line f-modal-long animateSuccessLong" />
                    <div className="f-modal-placeholder" />
                    <div className="f-modal-fix" />
                  </div>
                ) : notifyType === 3 ? (
                  <div className="f-modal-icon f-modal-warning animate">
                    <span className="f-modal-body pulseWarningIns" />
                    <span className="f-modal-dot pulseWarningIns" />
                    <div className="f-modal-placeholder" />
                    <div className="f-modal-fix" />
                  </div>
                ) : null}
              </div>
              <p
                className="modal-success-msg"
                style={notifyType === 0 ? { paddingTop: '20px', paddingBottom: '20px' } : {}}
              >
                {message}
              </p>
              {withButton && (
                <div className="text-center m-t-md">
                  {redirectURL !== undefined && redirectURL !== '' ? (
                    <Link
                      className="btn btn-sm btn-red mt-4"
                      to={redirectURL}
                      onClick={
                        buttonClick
                          ? e => {
                              dispatch(hideModal());
                              e.stopPropagation();
                              buttonClick();
                            }
                          : e => {
                              dispatch(hideModal());
                              e.stopPropagation();
                            }
                      }
                    >
                      Close
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-red mt-4"
                      onClick={
                        buttonClick
                          ? e => {
                              dispatch(hideModal());
                              e.stopPropagation();
                              buttonClick();
                            }
                          : e => {
                              dispatch(hideModal());
                              e.stopPropagation();
                            }
                      }
                    >
                      Close
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1999 }} />
    </>
  );
};

export default AlertMessageModal;
