import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
// import AppsIcon from '@mui/icons-material/Apps';
import "../Styles/Header.css";
import DetailPanel from './DetailPanel';

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleShow: false
        };
        this.SetDetailPanel = this.SetDetailPanel.bind(this);
    }

    SetDetailPanel() {
        this.setState({ toggleShow: !this.state.toggleShow });
    }

    render() {
        const { toggleShow } = this.state;
        return (
            <div className='header'>
                <div className="header__logo">
                    <img src="//ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png" alt="logo__image" />
                    <span>Drive</span>
                </div>
                <div className="header__searchContainer">
                    <div className="header__searchBar">
                        <SearchIcon />
                        <input type="text" placeholder="Tìm trong Drive" />
                        <ExpandMoreIcon />
                    </div>
                </div>
                <div className="header__icons">
                    <span>
                        <HelpOutlineIcon />
                        <SettingsIcon />
                    </span>
                    <div className="m-user-avatar m-icon" onClick={this.SetDetailPanel}></div>
                    {toggleShow && <DetailPanel />}
                    {/* setting icon, user avatar, help button */}
                </div>
            </div>
        )
    }
}

// export default index