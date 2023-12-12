import { useFetchVideosByCategory } from "../utils/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Thumbnail } from "./Thumbnail";
import { useState } from "react";
import { getVideoMeta } from "../utils/vimeoApi";
import { Popup } from "./Popup";
import useScreenSize from "../utils/useScreenSize";

interface VideosProps {
  category: string;
}

export function VideoListing(props: VideosProps) {
  const { category } = props;
  const { data, fetching, error } = useFetchVideosByCategory(category);
  const [currentEmbedIframe, setCurrentEmbedIframe] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const screenSize = useScreenSize();

  const handleGetIframe = async (uri: string) => {
    const result = await getVideoMeta(uri, Number(screenSize.width * 0.8));
    setCurrentEmbedIframe(result.html);
    setPopupOpen(true);
  };

  if (fetching) {
    return <div>Loading...</div>; // Basic loading state to display, while querry is running
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={25}
        slidesPerView={4}
        slidesPerGroup={4}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
      >
        {data.data.map((el: any) => (
          <SwiperSlide key={el.uri}>
            <Thumbnail
              image={el.pictures.sizes[2].link_with_play_button}
              title={el.name}
              handlePlaybackClick={() => handleGetIframe(el.link)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {popupOpen && (
        <Popup
          embedHtml={currentEmbedIframe}
          onCloseButtonClick={() => setPopupOpen(false)}
        />
      )}
    </div>
  );
}
