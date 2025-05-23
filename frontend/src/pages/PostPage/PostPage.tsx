import { observer } from "mobx-react-lite";
import PostStore from "@stores/PostStore";
import ModalStore from "@stores/ModalStore";
import { PostCard } from "@components/PostCard/PostCard";
import { Box, Button } from "@mui/material";
import { PostModal } from "@components/ModalAddPost/PostModal";
export const PostPage = observer(() => {
  const createNewPost = () => {
    ModalStore.modalOpen(null);
  }; // что
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <h2>Все посты</h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        {PostStore.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <Button
          sx={{ backgroundColor: "#1976d2", color: "whitesmoke" }}
          onClick={createNewPost}
        >
          Создать пост
        </Button>
        <PostModal />
      </Box>
    </Box>
  );
});
