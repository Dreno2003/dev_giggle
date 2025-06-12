export class ShareLinkUtils {
    static shareLink({
      url,
      platform,
      title,
    }: {
      url: string;
      platform: "facebook" | "twitter" | "telegram";
      title?: string;
    }) {
      const sharers = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}${title ? `&text=${encodeURIComponent(title)}` : ""}`,
        // twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        //   url
        // )}&text=${encodeURIComponent(title ?? '')}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title ?? "")}`,
      };
  
      // const handleShare = (platform) => {
      const shareUrl = sharers[platform];
      window.open(shareUrl, "_blank");
      // window.open(shareUrl, "_blank", "width=600,height=400");
      // };
  
      // const handleTikTokShare = async () => {
      //   try {
      //     await navigator.share({
      //       title,
      //       url,
      //     });
      //   } catch (err) {
      //     console.error('Share failed:', err);
      //   }
      // };
    }
  
    static async tikTokLink({
      url,
      title,
    }: {
      url: string;
      
      title?: ShareData;
    }) {
      // const handleTikTokShare = async () => {
      try {
        await navigator.share({
          title: title?.title,
          url,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    }
  }
  