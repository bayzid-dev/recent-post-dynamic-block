import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import PostItem from '../../components/PostItem';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarouselLayout = ({ posts, ...props }) => (
    <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="recent-posts-showcase">
        {posts.map((post) => (
            <SwiperSlide key={post.id}>
                <PostItem post={post} {...props} />
            </SwiperSlide>
        ))}
    </Swiper>
);

export default CarouselLayout;
