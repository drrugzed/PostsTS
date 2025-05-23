import PostStore from "@stores/PostStore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AuthStore from "@stores/AuthStore";
import { Box } from "@mui/material";
import ModalStore from "@stores/ModalStore";

import type { PostCardProps } from "@typings/postTypes";
export const PostCard = ({ post }: PostCardProps) => {
  const isAuthor = post.author === AuthStore.userId;
  const handleDelete = (): void => {
    if (window.confirm("Удалить пост")) {
      PostStore.deletePost(post.id);
    }
  };
  const handleEdit = (): void => {
    ModalStore.modalOpen(post);
  };
  return (
    <Card
      sx={{
        minWidth: 400,
        mb: 2,
        flexShrink: 0,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {post.content}
          </Typography>
        </Box>
        <Typography sx={{ marginLeft: "30px" }}>
          {post.author_username}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        {isAuthor && (
          <>
            <Button size="small" onClick={handleEdit}>
              Редактировать
            </Button>
            <Button size="small" onClick={handleDelete}>
              Удалить
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};
