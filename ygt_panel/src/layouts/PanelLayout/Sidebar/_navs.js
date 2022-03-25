import {
  RiDashboardFill,
  RiUserSettingsFill,
  RiListSettingsFill,
  RiHome3Fill,
  RiProfileFill,
  RiHotelFill,
  RiBriefcase3Fill,
  RiGlobalFill,
  RiCustomerService2Fill,
  RiQuestionFill,
} from "react-icons/ri";

export default [
  {
    name: "Gösterge Paneli",
    to: "/panel/dashboard",
    icon: RiDashboardFill,
  },
  {
    name: "Panel Hakkında",
    icon: RiQuestionFill,
    to: "/panel/documentation",
  },
  {
    section: "Panel",
  },
  {
    name: "Kullanıcılar",
    icon: RiUserSettingsFill,
    menu: [
      { name: "Kullanıcı Liste", to: "/panel/users/list" },
      { name: "Banlı Kullanıcılar", to: "/panel/users/ban" },
    ],
  },
  {
    name: "Diğer Bilgiler",
    icon: RiListSettingsFill,
    to: "/panel/other-infos",
  },
  {
    name: "İletişim",
    icon: RiCustomerService2Fill,
    to: "/panel/contacts",
  },
  {
    section: "Sayfalar",
  },
  {
    name: "Ana sayfa",
    icon: RiHome3Fill,
    to: "/panel/mains/home",
  },
  {
    name: "Hakkımızda",
    icon: RiProfileFill,
    menu: [
      { name: "Şarık Tara Anısına", to: "/panel/mains/about/sarik-tara" },
      { name: "Şirket Profili", to: "/panel/mains/about/company-profile" },
      { name: "Tarihçe", to: "/panel/mains/about/history" },
      { name: "Haberler", to: "/panel/mains/about/news" },
      {
        name: "Kurumsal Şirket Politikaları",
        to: "/panel/mains/about/corporate-company-policies",
      },
      {
        name: "Misyon, Vizyon & Değerler",
        to: "/panel/mains/about/mission-vision-values",
      },
      { name: "Ödüller & Başarılar", to: "/panel/mains/about/awards" },
      { name: "Ofislerimiz", to: "/panel/mains/about/offices" },
      { name: "Yönetim", to: "/panel/mains/about/administration" },
    ],
  },
  {
    name: "Faaliyet Alanları",
    icon: RiHotelFill,
    to: "/panel/mains/activity",
  },
  {
    name: "İştirakler",
    icon: RiBriefcase3Fill,
    to: "/panel/mains/affiliates",
  },
  {
    name: "Sürdürülebilirlik",
    icon: RiGlobalFill,
    to: "/panel/mains/sustainability",
  },
];
