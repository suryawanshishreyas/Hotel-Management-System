import React from 'react'

function MostOrdered() {
    const mostOrdered = [
        {
          name: "Idli Vada",
          count: 172,
          image: "https://th.bing.com/th/id/OIP.35Fg4YqXxgf_vjFjsqh3ogHaFf?pid=ImgDet&rs=1",
        },
        {
          name: "Punjabi Thali",
          count: 120,
          image: "https://i0.wp.com/tandoorindiankitchen.com.au/wp-content/uploads/2019/02/Veg-Thalis.jpg?fit=929%2C622&ssl=1",
        },
        {
          name: "Chai-Pakode",
          count: 80,
          image: "https://i.pinimg.com/736x/cf/93/82/cf9382e0961d794b23973a3488d84467.jpg",
        },
      ];
      
    return (
        <div className="flex flex-col p-6 bg-gray-100 rounded-lg gap-y-6 shadow basis-1/2">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-loose text-black">Most Ordered</h2>
                <button className="flex gap-x-2.5 py-3 px-4 rounded-lg border border-gray-700">
                    <span className="text-sm text-black">Today</span>
                </button>
            </div>
            <hr className="border-gray-400" />
            <div className="flex flex-col gap-y-4">
                { mostOrdered?.map((order) => (
                    <div className="flex gap-x-4 items-center" key={order.name}>
                        <img className="w-20 h-14" src={order.image} alt="" />
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm font-medium text-black">{ order.name }</div>
                            <div className="text-xs text-gray-600">{order.count } dishes ordered</div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="py-3.5 rounded-lg  w-full border bg-green-400 text-primary text-sm font-semibold"
            >
                View all
            </button>
        </div>
    )
}

export default MostOrdered