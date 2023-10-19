import React, { useState, useRef } from 'react';
import { MdRestaurantMenu } from 'react-icons/md';
import { GiTakeMyMoney } from 'react-icons/gi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { TbTrash } from 'react-icons/tb';
import { useReactToPrint } from 'react-to-print';
import QRCodeGenerator from './QRCodeGenerator';



function Pos() {
  const componentRef = useRef();
  const [cart, setCart] = useState([])
  const [paymentMode, setPaymentMode] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState([
    {
      name: "Idli Vada",
      cost: 40,
      quantity: 0,
      id: 1,
      category: "Breakfast"
    },
    {
      name: "Medu Vada",
      cost: 40,
      quantity: 0,
      id: 2,
      category: "Breakfast"
    },
    {
      name: "Vada Pav",
      cost: 15,
      quantity: 0,
      id: 3,
      category:"Evening Snacks"
    },
    {
      name: "Punjabi Thali",
      cost: 100,
      quantity: 0,
      id: 4,
      category:"Dinner" && "Lunch"
    },
    {
      name: "Chai Pakode",
      cost: 10,
      quantity: 0,
      id: 5,
      category:"Snacks Time"
    },
    {
      name: "BournVita",
      cost: 20,
      quantity: 0,
      id: 6,
      category:"Breakfast"
    },
    {
      name: "Coca Cola",
      cost: 10,
      quantity: 0,
      id: 7,
      category:"Beverages"
    },
    {
      name: "Omelette",
      cost: 35,
      quantity: 0,
      id: 8,
      category:"Hunger Hour"
    },
    {
      name: "Biryani",
      cost: 240,
      quantity: 0,
      id: 9,
      category:"Dinner"
    },
    {
      name: "Pistachio",
      cost:50,
      id:10,
      category:"Afternoon Snacks"
    }
  ])
  const [total, setTotal] = useState(0)


  const addToCart = (productId) => {

    const found = cart.some(el => el.id === productId);

    if (found) {

      let newProd = products.filter((p) => p.id === productId)

      const newCart = cart.map(p =>
        p.id === productId
          ? { ...p, quantity: p.quantity += 1, cost: p.cost + newProd[0].cost }
          : p
      );

      let sum = newCart.reduce(function (acc, obj) { return acc + obj.cost; }, 0);
      setTotal(sum)

      setCart(newCart)

    } else {
      let newProd = products.find((p) => p.id === productId);
      newProd.quantity = 1;
      setCart([...cart, newProd]);
      let sum = cart.reduce((acc, obj) => acc + obj.cost, 0) + newProd.cost;
      setTotal(sum);
    }
  };
    {/* QR Code State */}
    const [qrCodeData, setQRCodeData] = useState('');
    const updateQRCodeData = () => {
      const billData = {
        invoiceNumber: 'INV12345',
        customerName: 'John Doe', 
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          subtotal: item.cost, 
        })),
        totalAmount: total, 
      };
      const jsonData = JSON.stringify(billData);
      setQRCodeData(jsonData);
    };
    
  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const increase = (productId) => {
    const newCart = cart.map(p =>
      p.id === productId
        ? { ...p, quantity: p.quantity += 1, cost: p.cost + p.cost }
        : p
    );
    let sum = newCart.reduce(function (acc, obj) { return acc + obj.cost; }, 0);
    setTotal(sum)
    setCart(newCart)
  }

  const decrease = (productId) => {
    let decProd = products.filter((p) => p.id === productId)
    console.log(decProd);
    const newCart = cart.map(p =>
      p.id === productId
        ? { ...p, quantity: p.quantity -= 1, cost: p.cost - decProd[0].cost }
        : p
    );

    const filtered = newCart.filter(p => p.quantity > 0)
    let sum = filtered.reduce(function (acc, obj) { return acc + obj.cost; }, 0);
    setTotal(sum)

    setCart(filtered)
  }


  const clearAll = () => {
    setCart([]);
    setTotal(0);
    setPaymentMode(null);
  };

  const remove = (id) => {

    let newCart = cart.filter((p) => p.id !== id)
    setCart(newCart)
  }

  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const printBill = () => {
    handlePrint()
  }

  return (
    <section className='w-full p-4 bg-gray-200 h-screen overflow-auto'>
      <div className="grid grid-cols-12 w-full h-full gap-2">
        {/* right side  */}
        <div className="col-span-7 bg-orange-100 rounded h-fit w-full pt-4 px-2">
          {/* header  */}
          <div className="header flex items-baseline justify-between">
            <h2 className='font-semibold text-base text-gray-800 leading-3 whitespace-nowrap ' >Choose Category </h2>
          </div>
          {/* categories  */}
          <div className='flex pt-5 gap-3 overflow-auto categories'>
            <button className={`card rounded-lg p-3 px-4 bg-white ${
              selectedCategory === 'All' ? 'bg-red-200' : '' 
              }`}
              onClick={() => handleCategorySelection('All')} 
              >
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>All Products</p>
            </button>
            <button className={`card rounded-lg p-3 px-4 bg-white ${
                selectedCategory === 'Breakfast' ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleCategorySelection('Breakfast')}>
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>Breakfast</p>
            </button>

            <button className={`card rounded-lg p-3 px-4 bg-white ${
                selectedCategory === 'Lunch' ? 'bg-yellow-200' : ''
              }`}
              onClick={() => handleCategorySelection('Lunch')}>
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>Lunch</p>
            </button>

            <button className={`card rounded-lg p-3 px-4 bg-white ${
                selectedCategory === 'Afternoon Snacks' ? 'bg-red-200' : ''
              }`}
              onClick={() => handleCategorySelection('Afternoon Snacks')}>
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>Afternoon Snacks</p>
            </button>

            <button className={`card rounded-lg p-3 px-4 bg-white ${
                selectedCategory === 'Hunger Hour' ? 'bg-green-200' : ''
              }`}
              onClick={() => handleCategorySelection('Hunger Hour')}>
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>Hunger Hour</p>
            </button>

            <button className={`card rounded-lg p-3 px-4 bg-white ${
                selectedCategory === 'Snacks Time' ? 'bg-orange-200' : ''
              }`}
              onClick={() => handleCategorySelection('Snacks Time')}>
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>Chai-Pakode Time</p>
            </button>

            <button className={`card rounded-lg p-3 px-4 bg-white ${
                selectedCategory === 'Evening Snacks' ? 'bg-violet-200' : ''
              }`}
              onClick={() => handleCategorySelection('Evening Snacks')}>
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>Evening Snacks</p>
            </button>

            <button className={`card rounded-lg p-3 px-4 bg-white ${
                selectedCategory === 'Dinner' ? 'bg-emerald-200' : ''
              }`}
              onClick={() => handleCategorySelection('Dinner')}>
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>Dinner</p>
            </button>

            <button className={`card rounded-lg p-3 px-4 bg-white ${
                selectedCategory === 'Beverages' ? 'bg-lime-200' : ''
              }`}
              onClick={() => handleCategorySelection('Beverages')}>
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>Beverages</p>
            </button>
          </div>

          {/* header  */}
          <div className="flex my-3 px-2 justify-between items-center">
            <h4 className='font-semibold text-gray-600 text-sm'>
              {selectedCategory === 'All' ? 'All' : `${selectedCategory} Products`}
            </h4>
            <p className='font-semibold text-[0.7rem] text-gray-500'>{products
                .filter((product) =>
                  selectedCategory === 'All' || product.category === selectedCategory
                )
                .length}{' '}
              results
            </p>
          </div>

          {/* cards  */}

          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          {products
              .filter((product) =>
                selectedCategory === 'All' || product.category === selectedCategory
              )
              .map((product) => (
                <div
                  className="col-span-1 lg:py-8 bg-white rounded-md shadow-sm px-2 py-3 group hover:shadow-lg hover:scale-[102%] transition duration-300 ease-linear"
                  onClick={() => addToCart(product.id)}
                  key={product.name}
                >
                <div className="px-0 h-20 lg:h-25 rounded-lg">
                  <img src="https://images.ctfassets.net/3s5io6mnxfqz/6ZImCEzx6UuvuKaAiZEDDN/50479ee4a0902deb4eb1bab720ce248a/image1.jpg" alt="img" className='w-full rounded h-full' />
                </div>
                <p className='text-center text-xs font-medium py-4 leading-tight break-all '>{product?.name}</p>
                <p className='font-bold py-2 bg-gray-200 text-center rounded text-base'> Rs {product?.cost}</p>
              </div>
            ))}
          </div>
        </div>
        {/*  
          //? Section For Cart
        */}
        <aside className="col-span-5 bg-white rounded-lg shadow-lg min-h-max px-3 py-4">
          {/* cart items  */}

          <div className="flex justify-between items-center py-2">
            <p className="font-bold text-base">Order</p>
            <button onClick={clearAll} className='font-bold text-gray-600 bg-slate-100 px-2 rounded-md'>clear all</button>
          </div>

          <div>
            {cart?.map((p) => (
              <div className="product flex flex-col md:flex-row justify-between items-center bg-slate-200 px-1 rounded-xl  gap-y-2 pb-3 my-2">
                <div className="flex py-2 px-1 items-center">
                  <div className='h-16 w-16 hidden lg:inline-block'>
                    <img src="https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/03-5-768x480.jpg" alt="img" className='w-full rounded h-full' />
                  </div>
                  <div className='ml-1 px-1'>
                    <p className='text-xs md:text-sm font-bold text-gray-500 py-2'>{p.name}</p>
                    <p className='font-semibold text-sm  md:text-base'>{formatCurrency.format(p.cost)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => decrease(p.id)} className=""> <FiMinusCircle className='text-xl md:text-2xl' /> </button>
                  <p className='font-bold'>{p.quantity}</p>
                  <button onClick={() => increase(p.id)} className=""> < FiPlusCircle className='text-xl md:text-2xl' /> </button>
                  <TbTrash className='mr-2 text-lg md:text-xl' onClick={() => remove(p.id)} />
                </div>
              </div>
            ))}
          </div>

          {/* totals  */}
          <div className='py-5 bg-slate-100 px-2 rounded shadow-sm'>
            <div className="flex justify-between">
              <p className='font-bold text-sm'>Totals</p>
              <p className='font-bold text-sm'>{formatCurrency.format(total)}</p>
            </div>
          </div>
          
          {/* payment method */}
          {cart.length > 0 &&
            <h5 className='font-medium pt-2'>Payment Method</h5>
          }
          {cart.length > 0 &&
            <div className="flex justify-center gap-4 pt-2">
              <button
                style={{ backgroundColor: paymentMode === "UPI/Card" && "orange" }}
                onClick={() => setPaymentMode("UPI/Card")}
                className={`px-1 lg:px-4 bg-white border py-2 rounded  w-full flex flex-col lg:flex-row justify-around items-center hover:bg-slate-50`}>
                <FaRegMoneyBillAlt className='text-lg' />
                <p className='text-gray-500 font-bold text-xs uppercase'>UPI/Card</p>
              </button>
              <button
                style={{ backgroundColor: paymentMode === "CASH" && "Aqua" }}
                onClick={() => setPaymentMode("CASH")}
                className={`px-1 lg:px-4 bg-white border py-2 rounded  w-full flex flex-col lg:flex-row justify-around items-center hover:bg-slate-50`}>
                <GiTakeMyMoney className='text-lg' />
                <p className='text-gray-500 font-bold text-xs uppercase '>Cash</p>
              </button>
            </div>}

            

          {/* Print Bill */}
          {cart.length > 0 &&
            <button onClick={printBill} className="w-full mt-4 bg-green-400 rounded py-1 font-bold text-gray-700">
              Print bill
            </button>
          }
        </aside>

      </div>
      <div className=" bg-white hidden print:block mt-16 print:px-6 w-full" ref={componentRef} >
        <h3 className='text-center pt-2'>JSR Hotel</h3>
        <table className="w-full mt-5 border-collapse my-5">
          <thead>
            <tr className="text-sm font-medium bg-gray-200 uppercase text-black">
              <th className='whitespace-nowrap px-2 py-4 text-start'>item</th>
              <th className='whitespace-nowrap  py-1 text-end'>Qty</th>
              <th className='whitespace-nowrap px-2 py-1 text-end'>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item) => (
              <tr className="text-xs font-medium text-black border-b border-black" key={item.name}>
                <td className='mx-16 break-all pl-2 py-4 text-start'>{item.name}</td>
                <td className='text-end px-2'>{item.quantity}</td>
                <td className='capitalize text-end px-3'>{formatCurrency.format(item.cost)}</td>
              </tr>
            ))}
            <tr className="text-sm rounded bg-gray-100 font-semibold text-black">
              <td className='py-10'></td>
              <td className='text-end'>Total</td>
              <td className='capitalize text-end px-3'>{formatCurrency.format(total)}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p className="text-sm">
            Thank you for your business!
          </p>
          <p className="py-2 font-medium text-sm">
            served by SRS
          </p>
          <button onClick={updateQRCodeData} className="w-full mt-4 bg-yellow-400 rounded py-1 font-bold text-gray-700">Scan QR Code Below</button>
           {/* Add the QRCodeGenerator component here */}
           <div className='mx-auto w-1/2 bg-white text-blue-400 text-center p- mt-10'>
           {cart.length > 0 && (
            <QRCodeGenerator data={qrCodeData} />
          )}
          </div>
        </div>
      </div>

    </section>
  )
  
}

export default Pos