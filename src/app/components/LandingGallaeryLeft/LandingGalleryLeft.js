import Image from 'next/image'
import React from 'react'

function LandgingGalleryLeft() {
    const imageList=[
        'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1618609377864-68609b857e90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1680955436131-52b6d11cf6b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1613870948964-7125fa3e1aab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1683115179796-aaf64e354441?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxzdHVkaW98ZW58MHx8MHx8fDA%3D',
        'https://plus.unsplash.com/premium_photo-1664194584256-5c940e4e7ecf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgxfHxzdHVkaW98ZW58MHx8MHx8fDA%3D',
        'https://plus.unsplash.com/premium_photo-1682940443809-a214f034dca1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI5fHxzdHVkaW98ZW58MHx8MHx8fDA%3D'
    ]
    return (
        <div className='px-[5em] pb-[48px]'> {/* Changed py-12 to pb-[48px] */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 h-[80vh] items-center'>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 h-full'>
                    {imageList.map((e,i) => (
                        <div 
                            className='relative h-full w-full overflow-hidden transition-transform duration-300 hover:scale-105' 
                            key={i}
                        >
                            <Image 
                                src={e} 
                                alt={`Image ${i}`} 
                                fill
                                className='object-cover'
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
                <div className='text-center md:text-left space-y-6'>
                    <h3 className="font-Inter text-[#2b2b2b] font-[600] max-w-[600px] mx-auto md:mx-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas maximus nisl, et ornare arcu viverra sed. Mauris ac ante nunc. Donec facilisis varius varius. Nullam et quam non nibh eleifend suscipit hendrerit nec leo. Curabitur iaculis arcu et quam accumsan efficitur. Nam id nibh leo. Phasellus iaculis dapibus tempor.
                    </h3>
                    <h3>
                    Integer vestibulum ante diam, non maximus velit interdum vel. Integer eros metus, suscipit vitae elementum nec, rhoncus vel nulla. Integer ullamcorper vitae ipsum ac fermentum. Nam lacus dui, bibendum id purus in, maximus volutpat risus. Aliquam lobortis libero non velit pulvinar, ut laoreet diam posuere. Maecenas posuere turpis est, in vestibulum ante vestibulum ut. Nulla pellentesque varius mi et hendrerit. In pharetra porta nisi, ut pellentesque mi luctus et. Morbi sagittis metus in velit fringilla congue. Donec a vulputate felis. Duis id risus rhoncus, facilisis turpis quis, congue ante. Maecenas tincidunt dapibus mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam molestie est a ipsum pellentesque, et finibus lacus pulvinar.
                    </h3>
                    <h3>
                    Vestibulum eget odio tincidunt, imperdiet nulla sit amet, accumsan leo. Duis porta quam eget euismod molestie. Mauris ipsum leo, placerat at lectus consectetur, molestie convallis libero. Nulla fermentum, odio et dictum rutrum, lorem sapien blandit ante, non dignissim sem velit in enim. Aenean velit diam, imperdiet nec elit ac, consequat condimentum tellus. In vehicula ex in nibh lacinia gravida. Maecenas sed dui tempor lectus malesuada imperdiet ac vitae neque.
                    </h3>
                </div>
            </div>
        </div>
    )}
export default LandgingGalleryLeft