import { LOGO_PNG } from '../../../assets/images';
import Model from '../../../components/UI/Model/Model';

const ViewInvoice = props => {
  const { modalOpenClose, data } = props;

  const closeModel = () => {
    modalOpenClose(null);
  };

  // eslint-disable-next-line no-unused-vars
  return (
    <div className='invoice-model'>
      <Model
        headerTitle="Invoice"
        modalId="signUpModal"
        modalClass="modal-md"
        closeModel={closeModel}
      >
        <div className="invoice-box" id="invoice">
          <table cellPadding="0" cellSpacing="0">
            <tr className="top">
              <td colSpan="2">
                <table>
                  <tr>
                    <td className="title">
                      <img
                        src={LOGO_PNG} alt="Logo" style={{ width: 50, maxWidth: 50 }}
                      />
                    </td>

                    <td>
                      Invoice #: {data.appointmentId}<br />
                      Created: {data.invoiceDate}<br />
                      {/* Due: February 1, 2015 */}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="information">
              <td colSpan="2">
                <table>
                <tr>
                    <td colSpan="2">
                      <hr style={{ margin: 0 }} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Woody&apos;s Automotive<br />
                      {data.locationName}<br />
                    </td>
                    <td />
                  </tr>
                  <tr>
                    <td />
                    <td>
                      {data.customerName}<br />
                      test@test.com
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="heading">
              <td colSpan="2">Payment Method</td>

              {/* <td>Check #</td> */}
            </tr>

            <tr className="details">
              <td>{data.paymentMethod}</td>

              {/* <td>{data.total_charge}</td> */}
            </tr>

            <tr className="heading">
              <td>Item</td>

              <td>Price</td>
            </tr>

            <tr className="item">
              <td>{data.services.serviceName}</td>

              <td>${data.services.laborPrice + data.services.addCharge}</td>
            </tr>

            {
              data.services.partList.map(item => (
                <tr className="item">
                  <td>{item.pname}</td>

                  <td>${item.retailPrice}</td>
                </tr>
              ))
            }

            <tr className="total">
              <td />

              <td>Total: ${data.total_charge}</td>
            </tr>
          </table>
        </div>
      </Model>
    </div>
  );
};

export default ViewInvoice;
