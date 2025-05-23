'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import LionLoader from '@/components/LionLoader';
import axios from 'axios';
import { Product } from '@/Models/Product';
import { Toaster } from 'react-hot-toast';
import { set } from 'mongoose';
import  Header  from '@/components/pharmacy-landing page/Header';
import  Footer  from '@/components/pharmacy-landing page/Footer';
import TopBar from '@/components/patient/dashboard/top-bar/top-bar';

const BelowHeader = dynamic(() => import('@/components/pharmacy-landing page/BelowHeader'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const CoverImage = dynamic(() => import('@/components/pharmacy-landing page/Cover'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const UnisexClothingSection = dynamic(() => import('@/components/pharmacy-landing page/UniSex'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const CustomerReviews = dynamic(() => import('@/components/pharmacy-landing page/ReviewLanding'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const PremiumCertificate = dynamic(() => import('@/components/pharmacy-landing page/PremiumCertificate'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const ManufacturingTimeline = dynamic(() => import('@/components/pharmacy-landing page/TimeLine'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const OfferSection = dynamic(() => import('@/components/pharmacy-landing page/OfferSection'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const CatCarousel = dynamic(() => import('@/components/pharmacy-landing page/CategoriesCarouse'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const LimitZeroManifesto = dynamic(() => import('@/components/pharmacy-landing page/AboutUs'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const StableCarousel = dynamic(() => import('@/components/pharmacy-landing page/Featured'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const JoinUs = dynamic(() => import('@/components/pharmacy-landing page/JoinUs'), {
  ssr: false,
  loading: () => <LionLoader />,
});

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function useLazyInView() {
  const [inView, setInView] = useState(false);
  const { ref } = useInView({
    triggerOnce: true,
    onChange: (visible) => visible && setInView(true),
  });
  return { ref, inView };
}

export default function Home() {
  const { ref: catRef, inView: isCatInView } = useLazyInView();
  const { ref: manifestoRef, inView: isManifestoInView } = useLazyInView();
  const { ref: featuredRef, inView: isFeaturedInView } = useLazyInView();
  const { ref: joinUsRef, inView: isJoinUsInView } = useLazyInView();
  const { ref: belowHeaderRef, inView: isBelowHeaderInView } = useLazyInView();
  const { ref: coverImageRef, inView: isCoverImageInView } = useLazyInView();
  const { ref: unisexRef, inView: isUnisexInView } = useLazyInView();
  const { ref: reviewsRef, inView: isReviewsInView } = useLazyInView();
  const { ref: premiumCertRef, inView: isPremiumCertInView } = useLazyInView();
  const { ref: timelineRef, inView: isTimelineInView } = useLazyInView();
  const { ref: offerRef, inView: isOfferInView } = useLazyInView();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchData = async () => {
    //  try {
    //    const res = await axios.get('/api/fetchAll');
    //     if (res.data.success) {
    //       setLoading(false);
    //       setProducts(res.data.products);
    //       setCategories(res.data.categories);
    //       // Scroll to the top once the loading is done
    //       window.scrollTo({ top: 0, behavior: 'smooth' });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     window.location.reload();
    //   }finally{
         setLoading(false);
   //   }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LionLoader />
      ) : (
        <>
          <Toaster />
         <TopBar/>
          <Header/>

          <motion.div
            ref={belowHeaderRef}
            variants={animationVariants}
            initial="hidden"
            animate={isBelowHeaderInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <BelowHeader />
          </motion.div>

    
          <motion.div
            ref={premiumCertRef}
            variants={animationVariants}
            initial="hidden"
            animate={isPremiumCertInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <PremiumCertificate />
          </motion.div>

         

          <motion.div
            ref={offerRef}
            variants={animationVariants}
            initial="hidden"
            animate={isOfferInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <OfferSection />
          </motion.div>

          

          {/* <motion.div
            ref={catRef}
            variants={animationVariants}
            initial="hidden"
            animate={isCatInView ? 'visible' : 'visible'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <CatCarousel categories={categories!} />
          </motion.div> */}

          <motion.div
            ref={reviewsRef}
            variants={animationVariants}
            initial="hidden"
            animate={isReviewsInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <CustomerReviews />
          </motion.div>

          {/* <motion.div
            ref={featuredRef}
            variants={animationVariants}
            initial="hidden"
            animate={isFeaturedInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <StableCarousel featuredProducts={products} />
          </motion.div> */}

          <motion.div
            ref={manifestoRef}
            variants={animationVariants}
            initial="hidden"
            animate={isManifestoInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <LimitZeroManifesto />
          </motion.div>

          <motion.div
            ref={timelineRef}
            variants={animationVariants}
            initial="hidden"
            animate={isTimelineInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <ManufacturingTimeline />
          </motion.div>

          <motion.div
            ref={joinUsRef}
            variants={animationVariants}
            initial="hidden"
            animate={isJoinUsInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <JoinUs />
          </motion.div>
          <Footer/>
        </>
      )}
    </>
  );
}
