// scss
import './sass/main.scss';

// ui
import './app/ui/Message.js';
import './app/ui/ProfilePhoto.js';

// components
import './app/components/Header.js';
import './app/components/Chat.js';
import './app/components/ChatInfo.js';
import './app/components/ChatList.js';
import './app/components/ChatCreation.js';

// helpers
import './helpers/commonHelpers.js';
import './helpers/createElementHelpers.js';
import './helpers/changePageHelpers.js'

// set up an application
import setUpApplication from './helpers/setUpApplication.js';
setUpApplication();
