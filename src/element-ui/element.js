import Vue from 'vue'
import {
    Button,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Row,
    Input,
    Dialog,
    Message,
    Popover,
    Menu,
    MenuItemGroup,
    MenuItem,
    Submenu,
    Carousel,
    CarouselItem,
    InfiniteScroll,
    Col,
    Pagination,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Slider,
    Progress,
    Drawer,
    Backtop,
    MessageBox,
    Select,
    Option,
    Descriptions,
    DescriptionsItem,

    Tag,
    Popconfirm,
    DatePicker,
    TimePicker

    Badge, 
    Divider,
    RadioGroup,
    Radio,
    Avatar,
    InputNumber,

}
    from 'element-ui'


Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(InfiniteScroll)
Vue.use(Col);
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Slider)
Vue.use(Progress)
Vue.use(Drawer)
Vue.use(Backtop)
Vue.use(Select)
Vue.use(Option)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)

Vue.use(Tag)
Vue.use(Popconfirm)
Vue.use(DatePicker)
Vue.use(TimePicker)


Vue.use(InputNumber)
Vue.use(RadioGroup)
Vue.use(Avatar)
Vue.use(Radio)
Vue.use(Divider)
Vue.use(Badge)



Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm