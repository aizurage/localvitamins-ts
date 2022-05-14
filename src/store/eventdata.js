let eventdata = [
  {
    //写真も貼り付けてもらうと嬉しい。
    number: 1000,
    title:"雪かき手伝い",
    region:"会津若松市永和地区",
    date:"2022/05/20 9:00:00",
    catchcopy:"みんなで雪かきしましょう!",
    content: "永和地区内の住宅や道付近を中心に住民の方々と雪かきをします。特に力仕事の厳しい高齢者の住宅周辺などを行う予定です。",
    target: "会津大生　会津短大生",
    site: "永和地区公民館　〒965-0077 福島県会津若松市高野町大字上高野村前２８",
    reward: "農家さんの野菜、暖かいお昼ごはん",
    siteURL: "https://www.city.aizuwakamatsu.fukushima.jp/soshiki/kitakominkan/",
    inquiry: "b1202127@jc.u-aizu.ac.jp",
    timestamp: "2022/03/23 12:01:28",
    picture: "https://www.juicygarden.jp/themestory/wp-content/uploads/2019/10/top-2.jpg",
  },
  {
    number: 1001,
    title:"永和地区農作業お手伝い",
    region:"会津若松市永和地区",
    date:"2022/07/10 10:00:00",
    catchcopy:"農業体験してみませんか？",
    content: "永和地区の農家さんの畑で農作業のお手伝いをします。草むしりや収穫がメインになると思います。農作業のしたことのない人も大歓迎です。",
    target: "会津大生　会津短大生",
    site: "永和地区の農家さんの畑",
    reward: "農作物",
    siteURL: "",
    inquiry: "b1202127@jc.u-aizu.ac.jp",
    timestamp: "2022/03/23 13:23:09",
    picture: "https://tk.ismcdn.jp/mwimgs/2/c/1140/img_2cdfa165da36450d9255e0c1ddc580a6577202.jpg",
  },
  {
    number: 1002,
    title:"お米の収穫",
    region:"会津若松市永和地区",
    date:"2022/07/10 10:00:00",
    catchcopy:"お米収穫祭！！",
    content: "永和地区の農家さんが育てたおいしいお米の収穫を学生の皆さんにお手伝いしていただきます。会津に来たからこそできる貴重な体験です。少しでも興味のある方はご連絡参加お待ちしております。",
    target: "会津大生　会津短大生",
    site: "永和地区○○さんの田畑",
    reward: "後日、永和地区の美味しいお米をプレゼント",
    siteURL: "",
    inquiry: "b1202127@jc.u-aizu.ac.jp",
    timestamp: "2022/03/23 15:16:41",
    picture: "https://www.kett.co.jp/wp-content/uploads/2018/10/azumino-900x450.jpg",
  },
];

export function getEventdata() {
  return eventdata;
}

export function getEvent(number) {
  return eventdata.find(
    (event) => {
      return event.number == number;
    }
  );
}
