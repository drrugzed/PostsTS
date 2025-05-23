import { useEffect, useState } from "react";
import ModalStore from "@stores/ModalStore";
import { observer } from "mobx-react-lite";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import PostStore from "../../stores/PostStore";

export const PostModal = observer(() => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    if (ModalStore.currentPost) {
      setTitle(ModalStore.currentPost.title || "");
      setContent(ModalStore.currentPost.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [ModalStore.currentPost, ModalStore.isOpen]);
  const handleClose = (): void => {
    ModalStore.modalClose();
  };

  const handleSubmit = async (): Promise<void> => {
    if (ModalStore.isEditMode && ModalStore.currentPost) {
      const id = ModalStore.currentPost.id;
      const updatedPost = PostStore.prepareUpdatedPost(ModalStore.currentPost, {
        title,
        content,
      });
      await PostStore.updatedPost(id, updatedPost);
      ModalStore.modalClose();
    } else {
      await PostStore.createPost({
        title,
        content,
      });
      ModalStore.modalClose();
    }
  };
  return (
    <div>
      <Modal
        open={ModalStore.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            {ModalStore.currentPost ? "Редактировать пост" : "Добавить пост"}
          </Typography>
          <TextField
            label="Заголовок"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Содержимое"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            {ModalStore.isEditMode ? "Сохранить" : "Добавить"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
});
