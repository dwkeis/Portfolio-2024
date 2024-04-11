/* 1. Access APIs */
import { init, Style } from '@master/css';
/* 2. Configure your initial options here ... */
Style.extend('classes',
  {
    hover: "color:#0000004d:hover transition:all|0.5s",
    hover2: "opacity:0.25:hover transition:all|0.5s",
  },
);
/* 3. Manually initialize */
init();
