import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faCodeBranch,
  faEye,
  faEyeSlash,
  faFile,
  faLock,
  faLockOpen,
  faMoon,
  faRightFromBracket,
  faServer,
  faSignOutAlt,
  faSun,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faUser,
  faLock,
  faSignOutAlt,
  faMoon,
  faSun,
  faUserGroup,
  faServer,
  faBars,
  faEye,
  faEyeSlash,
  faFile,
  faCodeBranch,
  faLockOpen,
  faRightFromBracket,
);

export default FontAwesomeIcon;
