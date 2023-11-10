import React from 'react'

function VipInfo() {
  return (
    <div className="flex flex-col md:flex-row justify-center space-y-7 md:space-x-7 mx-4 md:mx-32 mt-5 ">
      {/* <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center mt-5"> */}
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-4xl p-7 text-center mt-10 ">
        
   
          <h1 className='font-bold'><FontAwesomeIcon icon={faStar} size="2x" style={{ color: 'gold' }} />  VIP Member: Congrats on being a VIP Trainer!</h1>
          <p className='pt-10'>
          Are you ready to take your teaching journey to the next level? On being our VIP trainer , you gain exclusive access to students who are VIP members. Our students might be thrilled to experience personalized guidance, extended video chat sessions, and valuable suggestions that will accelerate their progress. We welcome you to our Talki family as an exclusive VIP member. We are excited to see your performance. Good luck !
          </p>
          
          {/* Content for the first section */}
            
        </div>
        
      
    </div> 
  )
}

export default VipInfo
