import css from 'styled-jsx/css'

export const stylesLocal = css.global`
.card {
    margin: 1% 1% 1% 1%;
    width: 48%;
}

.card-body {
    text-align:center;
}

.card-body span {
    display:inline-block;
    width:100px;
    text-align:left;
}

.card-body span:first-of-type {
    text-align:right
}

.card-col {
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
}

.card-title {
    text-align: center;
}

.nav {
    position: fixed;
    z-index: 1;
    width: 100%;
}

.nav-icon {
    margin-right: 10px;
    width: 18px;
}

.rowContainer {
    height: 90%;
    margin-top: 60px;
}

.rowNav {
    height: 10%;
}

.sidebar {
    list-style: none;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 70px;
    margin-left: -40px;
}


@media screen and (max-width: 768px) {
    .card {
        margin: 1% 1% 1% 1%;
        width: 98%;
    }
    .sidebar-sticky {
        visibility: hidden;
    }
}
`
