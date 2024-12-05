import React from 'react'
import banner1 from '../assets/about-image-2.jpg'
import banner2 from '../assets/about-image-3.jpg'
import banner3 from '../assets/about-image-4.jpg'
import Image from 'next/image'
import Features from '../components/Features'
import SubNewsLatter from '../components/SubNewsLatter'
const contact = () => {
  return (
    <div>
        <div
        className="h-[350px] w-full bg-cover bg-center flex items-center justify-center bg-about"
      >
      <div className='max-w-4xl mx-auto text-center space-y-3 text-white'>
      <h4 className=' md:text-lg font-medium'>About Blonwe</h4>
        <h2 className='text-3xl md:text-5xl font-bold'>Do You Want To Know Us?</h2>
        <p className='text-base'>Let us introduce the furnob to you briefly, so you will have a better understanding of our quality</p>
      </div>
      </div>
      <div className='max-w-5xl mx-auto text-center py-6 space-y-3'>
        <h2 className='text-2xl md:text-4xl font-medium'>Pellentesque habitant morbi tristique senectus et netus et malesuada fames.</h2>
        <p className='text-base text-gray-500'>In hac habitasse platea dictumst. Pellentesque viverra sem nec orci lacinia, in bibendum urna mollis. Quisque nunc lacus, varius vel leo a, pretium lobortis metus. Vivamus consectetur consequat justo. Sed interdum nunc ut tristique congue. Quisque maximus mauris et dui sagittis scelerisque.</p>
      </div>
      <div className="flex flex-col items-center max-w-7xl mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center py-10">
        {[
          { value: "350+", description: "Aenean condimentum cursus aliquet. Aliquam eget pulvinar lorem." },
          { value: "30.459", description: "Aenean condimentum cursus aliquet. Aliquam eget pulvinar lorem." },
          { value: "800K", description: "Aenean condimentum cursus aliquet. Aliquam eget pulvinar lorem." },
          { value: "1950+", description: "Aenean condimentum cursus aliquet. Aliquam eget pulvinar lorem." },
          { value: "2.8K", description: "Aenean condimentum cursus aliquet. Aliquam eget pulvinar lorem." },
        ].map((stat, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h2 className="text-3xl font-medium">{stat.value}</h2>
            <p className="text-gray-500 text-sm">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 px-10">
        <div className=' md:w-[65%]'>
          <Image
            src={banner1}
            alt="Team working"
            className="rounded-lg h-[400px] md:h-[500px] object-cover overflow-hidden"
          />
        </div>
        <div className=' md:w-[35%]'>
          <Image
            src={banner2}
            alt="Discussion"
            className="rounded-lg h-[400px] md:h-[500px] object-cover overflow-hidden"
          />
        </div>
      </div>
    </div>
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid gap-8 md:gap-12">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-light text-muted-foreground">01.</span>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Fusce quis rutrum lectus</p>
              <h2 className="text-3xl font-medium leading-tight">
                Ullamcorper sit amet lorem sed, tempus eleifend lacus fornelluis.
              </h2>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid gap-6 text-gray-500">
          <p className="text-muted-foreground">
            Ut vitae massa a metus viverra finibus gravida at purus. Fusce quis rutrum lectus. Suspendisse tincidunt, lorem at cursus sodales, ligula arcu molestie odio, non mattis est elit et enim. Nulla non erat sed metus bibendum aliquam. Nunc venenatis elementum magna, sit amet auctor nisi. Ut vitae nunc eleifend, congue lorem consectetur, sodales ligula. Mauris ac nulla at risus mollis luctus lacinia vitae tortor. Vestibulum ut mi ut tortor maximus tristique ac in mi.
          </p>
          
          <p className="text-muted-foreground">
            Phasellus sit amet iaculis tortor. Curabitur rhoncus arcu rutrum, tincidunt lorem sed, pulvinar magna. Donec pulvinar purus eget velit bibendum faucibus. Aliquam vitae turpis hendrerit, tempus diam ac, fringilla ex. Proin nec ex risus. Mauris suscipit at dui ut dapibus. Nam ullamcorper tincidunt est, et lacinia magna congue ut.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Image Section */}
            <div className="relative h-[600px] overflow-hidden rounded-lg">
              <Image
                src={banner3}
                alt="Two people working on laptops"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Right Content Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Ut vitae massa a metus viverra finibus gravida at purus. Fusce squis rutrum lectus. Suspendisse tincidunt, lorem at cursus sodales, ligula arcu molestie odio, non mattis est elit et enim. Nulla non erat sed metus bibendum aliquam. Nunc venenatis elementum magna, sit amet auctor nisi. Ut vitae nunc eleifend, congue lorem consectetur, sodales ligula. Mauris ac nulla at risus mollis luctus lacinia vitae tortor. Vestibulum ut mi ut tortor maximus tristique ac in mi.
                </p>
                <p className="text-muted-foreground">
                  Phasellus sit amet iaculis tortor. Curabitur rhoncus arcu rutrum, tincidunt lorem sed, pulvinar magna. Donec pulvinar purus eget velit bibendum faucibus. Aliquam vitae turpis hendrerit, tempus diam ac, fringilla ex. Proin nec ex risus. Mauris suscipit at dui ut dapibus. Nam ullamcorper tincidunt est, et lacinia magna congue ut.
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 text-muted-foreground list-disc px-4">
                <li> Maecenas id neque neque. Curabitur gravida</li>
                <li> Donec porta dapibus mi</li>
                <li> Quisque et suscipit velit. Sed eros magna, rutrum et magna ac</li>
                <li> Proin laoreet luctus felis, commodo</li>
                <li> Fusce quis nisi sed neque</li>
                <li> Suspendisse quis condimentum neque</li>
                <li> Suspendisse at leo hendrerit</li>
              </ul>

              <p className="text-muted-foreground">
                  Phasellus sit amet iaculis tortor. Curabitur rhoncus arcu rutrum, tincidunt lorem sed, pulvinar magna. Donec pulvinar purus eget velit bibendum faucibus. Aliquam vitae turpis hendrerit, tempus diam ac, fringilla ex. Proin nec ex risus. Mauris suscipit at dui ut dapibus. Nam ullamcorper tincidunt est, et lacinia magna congue ut.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid gap-8 md:gap-12">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-light text-muted-foreground">02.</span>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Fusce quis rutrum lectus</p>
              <h2 className="text-3xl font-medium leading-tight">
                Ullamcorper sit amet lorem sed, tempus eleifend lacus fornelluis.
              </h2>
            </div>
          </div>
        </div>
        <div className="grid gap-6 text-gray-500">
          <p className="text-muted-foreground">
            Ut vitae massa a metus viverra finibus gravida at purus. Fusce quis rutrum lectus. Suspendisse tincidunt, lorem at cursus sodales, ligula arcu molestie odio, non mattis est elit et enim. Nulla non erat sed metus bibendum aliquam. Nunc venenatis elementum magna, sit amet auctor nisi. Ut vitae nunc eleifend, congue lorem consectetur, sodales ligula. Mauris ac nulla at risus mollis luctus lacinia vitae tortor. Vestibulum ut mi ut tortor maximus tristique ac in mi.
          </p>
          
          <p className="text-muted-foreground">
            Phasellus sit amet iaculis tortor. Curabitur rhoncus arcu rutrum, tincidunt lorem sed, pulvinar magna. Donec pulvinar purus eget velit bibendum faucibus. Aliquam vitae turpis hendrerit, tempus diam ac, fringilla ex. Proin nec ex risus. Mauris suscipit at dui ut dapibus. Nam ullamcorper tincidunt est, et lacinia magna congue ut.
          </p>
          </div>
          <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
              <Image
                src={banner3}
                alt="Two people working on laptops"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid gap-6 text-gray-500">
          <p className="text-muted-foreground">
            Ut vitae massa a metus viverra finibus gravida at purus. Fusce quis rutrum lectus. Suspendisse tincidunt, lorem at cursus sodales, ligula arcu molestie odio, non mattis est elit et enim. Nulla non erat sed metus bibendum aliquam. Nunc venenatis elementum magna, sit amet auctor nisi. Ut vitae nunc eleifend, congue lorem consectetur, sodales ligula. Mauris ac nulla at risus mollis luctus lacinia vitae tortor. Vestibulum ut mi ut tortor maximus tristique ac in mi.
          </p>
          
          <p className="text-muted-foreground">
            Phasellus sit amet iaculis tortor. Curabitur rhoncus arcu rutrum, tincidunt lorem sed, pulvinar magna. Donec pulvinar purus eget velit bibendum faucibus. Aliquam vitae turpis hendrerit, tempus diam ac, fringilla ex. Proin nec ex risus. Mauris suscipit at dui ut dapibus. Nam ullamcorper tincidunt est, et lacinia magna congue ut.
          </p>
          </div>
        </div>
        </section>
        <Features />
        <SubNewsLatter />
    </div>
  )
}

export default contact
