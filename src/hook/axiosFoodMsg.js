import axios from 'axios'
export default function () {
    axios.get("/api/swiper").then((res) => {
        if (res.data.code === 200) {
            return res.data.data.records;
        }
    }).catch((err) => {
        console.log(err);
    })
}