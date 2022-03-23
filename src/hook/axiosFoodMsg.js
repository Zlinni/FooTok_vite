import axios from 'axios'

export default async function () {
    var arr = [];
    await axios.get("/api/swiper").then((res) => {
        if (res.data.code === 200) {
            arr = res.data.data.records;
        }
    }).catch((err) => {
        console.log(err);
    })
    return arr
}