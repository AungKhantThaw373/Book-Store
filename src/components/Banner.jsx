import React from 'react'
import BannerCard from '../home/BannerCard'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
            <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
                {/* left side */}
                <div className='md:w-1/2 space-y-8 h-full'>
                    <h2 className='text-5xl font-bold leading-snug text-black'>Buy and Sell Your Books<span className='text-blue-700'> for the Best Prices</span></h2>
                    <p className='md:w-4/5'>Make your account and become part of our seller community. You can buy or sell books of your choice with fair prices and in a secure environment.</p>
                    <div>
                        <Link to="/login">
                            <button className='bg-blue-500 px-6 py-2 text-white font-medium hover:bg-blue-700 transiton-all ease-in duration-200 rounded'>Get Started</button>
                        </Link>

                    </div>
                </div>

                {/* right side */}
                <div>
                    <BannerCard />
                </div>
            </div>
        </div>

    )
}

export default Banner