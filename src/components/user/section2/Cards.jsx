import React from 'react';

function Cards() {
  return (
    
    <div className="flex flex-col md:flex-row justify-between space-y-7 md:space-x-7 mx-4 md:mx-40 ">
      {/* <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center mt-5"> */}
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-3xl p-5 text-center mt-7 flex-1">
          <img
            srcSet="https://static.vecteezy.com/system/resources/previews/020/389/525/original/hand-drawing-cartoon-girl-cute-girl-drawing-for-profile-picture-vector.jpg"
            alt="Your Image"
            className="mx-auto mb-4 h-16 w-16 rounded-full"
            // style={{ width: '100px', height: '100px' }}
          />
          <p>
            "What I like about Talki is that all the tutors are native English
            speakers and their high teaching quality. My English has improved a
            lot and I am having fun studying it!"
          </p>
          <p className='font-bold mt-28'>
            Shoji
          </p>
          <p>
            Japan
          </p>
          {/* Content for the first section */}
        </div>
      {/* </section> */}

      {/* <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center"> */}
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-3xl p-5 text-center flex-1">
          <img
            src="https://img.freepik.com/premium-vector/illustration-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=360"
            alt="Your Image"
            className="mx-auto mb-4 h-16 w-16 rounded-full"
            // style={{ width: '100px', height: '100px' }}
          />
          <p>
            "After using Talki, I seldom have a situation where I am so nervous
            that my hands shake when I speak English. I used to be afraid of
            speaking English, and I was always afraid that I wouldn't speak well
            enough for others to understand, but now I am much better!"
          </p>
          <p className='font-bold mt-16'>
          Xinrui Liu
          </p>
          <p>
          China
          </p>
          {/* Content for the second section */}
        </div>
      {/* </section> */}

      {/* <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center"> */}
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-3xl p-5 text-center flex-1">
          <img
            src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-profile-picture-png-image_11063391.png"
            alt="Your Image"
            className="mx-auto mb-4 h-16 w-16 rounded-full"
            // style={{ width: '100px', height: '100px' }}
          />
          <p>
            "I have experienced a growth in my confidence as an English-speaker,
            with a host of idioms now at my disposal. No matter where you come
            from or who you are, Talki will be your best companion on the
            journey toward better English"
          </p>
          <p className='font-bold mt-20'>
          Khalid Al Ghareeb
          </p>
          <p>
          Kuwait
          </p>
          {/* Content for the third section */}
        </div>
      {/* </section> */}
    </div>
  );
}

export default Cards;
