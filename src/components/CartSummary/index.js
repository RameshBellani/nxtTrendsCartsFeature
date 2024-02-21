// Write your code here
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })

      let selectedPaymentMethod = '' // State to store the selected payment method

      const handlePaymentChange = event => {
        // Update the selected payment method
        selectedPaymentMethod = event.target.value
      }

      const handleConfirmOrder = close => {
        // Function to handle order confirmation
        if (selectedPaymentMethod === 'Cash on Delivery') {
          console.log('Your order has been placed successfully')
          close()
        }
      }

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}
              /-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>

            <Popup
              trigger={
                <button type="button" className="checkout-button button">
                  Checkout
                </button>
              }
              modal
              nested
            >
              {close => (
                <div className="modal">
                  <button type="button" className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header"> Payment </div>
                  <div className="content">
                    <h1>Payment options</h1>
                    <p>Total Items: {cartList.length}</p>
                    <p>Total Price: {total} Rs</p>
                    <form>
                      <label>
                        <input
                          type="radio"
                          value="Net Banking"
                          disabled
                          checked={selectedPaymentMethod === 'Net Banking'}
                          onChange={handlePaymentChange}
                        />
                        Net Banking
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          value="Cash on Delivery"
                          checked={selectedPaymentMethod === 'Cash on Delivery'}
                          onChange={handlePaymentChange}
                        />
                        Cash on Delivery
                      </label>
                    </form>
                  </div>
                  <div className="actions">
                    <Popup
                      trigger={
                        <button
                          type="button"
                          className="button"
                          disabled={
                            selectedPaymentMethod !== 'Cash on Delivery'
                          }
                        >
                          Confirm Order
                        </button>
                      }
                      position="top center"
                      nested
                    >
                      {closeNested => (
                        <div className="successMsg">
                          <p>Your order has been placed successfully</p>
                          <button
                            type="button"
                            onClick={() => handleConfirmOrder(close)}
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </Popup>
                    <button type="button" className="button" onClick={close}>
                      Cancel Payment
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
