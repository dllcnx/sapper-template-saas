import * as sapper from '@sapper/app';
import '../node_modules/bulma/css/bulma.min.css';
import "./style/global.scss";

sapper.start({
	target: document.querySelector('#sapper')
});
