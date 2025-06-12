import { useLikeMeme } from "@/hooks/useLikeMeme.hook";
import { useAppSelector } from "@/store/redux-state-hook";
import clsx from "clsx";
import * as React from "react";
import { BsBookmark } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface BookmarkButtonProps {
  onBookMark: () => void;
}

interface LikeButtonProps {
  memeId: string;
  isLiked: boolean;
}

function BookmarkButton({ onBookMark }: BookmarkButtonProps) {
  const [isBookMark, setIsBookMark] = React.useState(false);
  return (
    <div
      onClick={() => {
        onBookMark();
        setIsBookMark(true);
      }}
    >
      <BsBookmark className={clsx(isBookMark && " ", " text-white ")} />
    </div>
  );
}

// export default BookmarkButton;

function LikeButton({ memeId, isLiked }: LikeButtonProps) {
  const [isLike, setIsLiked] = React.useState(isLiked);
  // const [likeCount, setLikeCount] = React.useState(prevLike ?? 0);
  const { user } = useAppSelector((state) => state.user);
  const mutate = useLikeMeme(memeId, user?.uid ?? "");

  async function handleLike(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const liked = !isLike;
    const count = liked ? 1 : -1;

    // capture previous like and count
    const prevLike = isLike;
    // const prevCount = likeCount;

    if (mutate.status === "pending") return;
    setIsLiked(liked);
    // setLikeCount((prev) => prev++);
    // setLikeCount((prev) => Math.max(0, prev + count));

    try {
      await mutate.mutateAsync();
      // await mutate here
    } catch (error) {
      setIsLiked(prevLike);
      // setLikeCount(prevCount);
    }
  }

  return (
    <div onClick={handleLike} className="bg-none">
      {isLike ? (
        <GoHeartFill className={clsx("")} />
      ) : (
        <GoHeart
          className={clsx("!stroke-white fill-white text-white size-[1.2rem]")}
        />
      )}
    </div>
  );
}

interface EngagementButtonsProps extends LikeButtonProps {}
function EngagementButtons({ memeId, prevLike }: EngagementButtonsProps) {
  return (
    <div className="flex gap-x-3 absolute items-center   left-4 top-4">
      <BookmarkButton />
      <LikeButton memeId={memeId} prevLike={prevLike} />
    </div>
  );
}
export default EngagementButtons;
