import React, { FC, useCallback, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const PlayerActions: FC = () => {
  const extraIcon = useRef<HTMLButtonElement>(null);
  const [isExtraOpen, setIsExtraOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const openExtra = useCallback(() => setIsExtraOpen(true), []);
  const closeExtra = useCallback(() => setIsExtraOpen(false), []);

  const openGuide = useCallback(() => setIsGuideOpen(true), []);
  const closeGuide = useCallback(() => setIsGuideOpen(false), []);

  return (
    <>
      <IconButton
        onClick={openExtra}
        onMouseOver={openExtra}
        className="delete-button"
        title="Дополнительно"
        aria-controls="extra"
        ref={extraIcon}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="extra"
        open={isExtraOpen}
        onClose={closeExtra}
        anchorEl={extraIcon.current}
        PaperProps={{ style: { width: '20ch' }, onMouseLeave: closeExtra }}
        TransitionProps={{ timeout: 0 }}
      >
        <MenuItem onClick={openGuide}>Гайд</MenuItem>
      </Menu>
      <Dialog open={isGuideOpen} onClose={closeGuide} maxWidth="md">
        <DialogTitle>Гайд</DialogTitle>
        <DialogContent>
          <DialogContentText>
            После захода на сайт, на канале автоматически создается награда "Заказ видео". Вы можете менять эту награду
            КАК УГОДНО, только не удаляйте. Все видео заказанные через эту награду добавляются на сайт, нажав на кнопку
            "Загрузить еще" добавятся все выкупленные награды, которых еще нет в списке.
          </DialogContentText>
          <DialogContentText>
            У каждого чатерса есть только один голос на скип/сейв, но выбор все еще можно поменять. Тот кто заказал
            видео не имеет вообще никакого голоса.
          </DialogContentText>
          <DialogContentText>Пока что начало с определенной секунды не учитывается в плеере.</DialogContentText>
          <DialogContentText>
            команда "!видос" - отправляет в чат ссылку на текущее видео, если кто-то хочет получить ссылочку, то можно
            не просить стримера, а просто написать команду.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeGuide} color="primary" variant="outlined">
            закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlayerActions;
