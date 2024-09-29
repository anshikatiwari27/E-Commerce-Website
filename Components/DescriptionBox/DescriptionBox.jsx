import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>E-commerce works on the same principles as a physical store. 
                Customers come into your e-commerce store, browse products and make a purchase. 
                The big difference is they don't have to get off their couch to do so, 
                and your customer base isn't limited to a specific geographic area or region.</p>
                <p>E-commerce is just one part of running an e-business. While the latter involves the entire process of 
                    running a business online, e-commerce simply refers to the sale of goods and services via the internet. 
                    E-commerce companies like Amazon, Alibaba, and eBay have changed the way the retail industry works, forcing major, 
                    traditional retailers to change the way they do business.If starting an e-commerce site is something you're considering,
                    make sure you do your research before you start. And make sure you start with a small, narrow focus to ensure that you have room to grow.</p>
        </div>
    </div>
  )
}

export default DescriptionBox
