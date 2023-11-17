export const shortcuts = Object.freeze({
  togglePlay: {
    key: ['KeyK', 'Space'],
    label: 'k/space',
    action: 'Play/Pause/Replay',
  },
  toggleMute: {
    key: 'KeyM',
    label: 'm',
    action: 'Mute/Unmute',
  },
  toggleFullscreen: {
    key: 'KeyF',
    label: 'f',
    action: 'Toggle Fullscreen',
  },
  togglePictureInPicture: {
    key: 'KeyI',
    label: 'i',
    action: 'Toggle picture in picture',
  },
  forward: {
    key: 'ArrowRight',
    label: 'right',
    action: 'Forward 10s',
  },
  replay: {
    key: 'ArrowLeft',
    label: 'left',
    action: 'Replay 10s',
  },
});
