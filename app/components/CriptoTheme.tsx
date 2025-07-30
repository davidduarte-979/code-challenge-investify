import Image from 'next/image'

import blurCyanImage from '../images/blur-cyan.png'

import { HeroBackground } from './HeroBackground';

export const CriptoTheme: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
    return (
        <div className=" bg-slate-900 dark:mt-[-4.75rem] dark:pt-19">
          <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
            <div className="w-screen h-screen mx-auto items-center lg:px-8 xl:gap-x-16 xl:px-12">
              <div className='relative z-10 flex justify-center flex-col items-center'>
                {children}
              </div>
              <div className="relative z-10 md:text-center lg:text-left">
                <Image
                  className="absolute right-full bottom-full -mr-72 -mb-56 opacity-50"
                  src={blurCyanImage}
                  alt=""
                  width={530}
                  height={530}
                  unoptimized
                  priority
                />
              </div>
              <div className="relative lg:static xl:pl-10">
                <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 mask-[linear-gradient(transparent,white,white)] lg:-top-32 lg:right-0 lg:-bottom-32 lg:left-[calc(50%+14rem)] lg:mask-none dark:mask-[linear-gradient(transparent,white,transparent)] lg:dark:mask-[linear-gradient(white,white,transparent)]">
                  <HeroBackground className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};
