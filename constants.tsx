
import React from 'react';
import { 
  Shield, Network, Eye, Lock, Server, Cpu, Activity, Zap, 
  Flame, Bell, Waves, PhoneCall, BatteryCharging, FileText,
  ShieldAlert, Radio, Search, MousePointer2, Thermometer,
  Layers, HardDrive, Wifi, ShieldCheck, CheckCircle2,
  Wind, ZapOff, ClipboardCheck, Globe, Smartphone, Code2, AppWindow
} from 'lucide-react';
import { Service, CaseStudy, Industry } from './types';

export const SERVICES: Service[] = [
  {
    id: "yangin-alarm",
    title: "Yangın Alarm Sistemleri",
    category: "Güvenlik",
    oneLiner: "Erken uyarı, doğru algılama, hızlı müdahale.",
    description: "Yönetmeliklere uygun, adresli ve konvansiyonel yangın algılama çözümleri.",
    longDescription: "EN54 standartlarına tam uyumlu, akıllı duman ve ısı algılama sensörleri ile donatılmış sistemler. Binanızın her hücresini 7/24 izleyen, merkezi yangın santrali entegrasyonu ile saniyeler içinde müdahale imkanı sunan profesyonel mühendislik çözümü.",
    microMetrics: ["EN54 opsiyonu", "Periyodik bakım", "7/24 izleme"],
    visualHint: "smoke-wave hologram + sensor node",
    features: ["Akıllı Sensör Füzyonu", "Adresli Algılama", "Otomasyon Entegrasyonu", "Hızlı Tahliye Uyarıları"],
    tags: ["GÜVENLİK", "YANGIN", "EN54"],
    icon: "Flame"
  },
  {
    id: "web-yazilim",
    title: "Web Mühendisliği & UI/UX",
    category: "Yazılım",
    oneLiner: "Modern, ölçeklenebilir ve yüksek performanslı web mimarileri.",
    description: "Next.js ve React tabanlı kurumsal web uygulamaları.",
    longDescription: "Sadece bir web sitesi değil, yaşayan bir dijital ekosistem. SEO uyumlu, yüksek performanslı (Core Web Vitals), PWA (Progressive Web App) standartlarında geliştirilen, marka kimliğinizi yansıtan ultra-premium web arayüzleri ve yönetim panelleri.",
    microMetrics: ["%100 SEO", "React/Next.js", "Core Vitals"],
    visualHint: "code browser window + floating elements",
    features: ["SSR & CSR Rendering", "Headless CMS", "Global CDN", "DDoS Koruması"],
    tags: ["WEB", "UI/UX", "REACT"],
    icon: "Globe"
  },
  {
    id: "kamera",
    title: "Güvenlik Kamera Sistemleri",
    category: "Güvenlik",
    oneLiner: "AI destekli izleme ve kayıt çözümleri.",
    description: "Yüksek çözünürlüklü IP kameralar ve akıllı video analizleri.",
    longDescription: "Yapay zeka algoritmaları ile insan/araç ayrımı, sanal sınır ihlali ve plaka tanıma yeteneklerine sahip 8K çözünürlüğe kadar destekleyen görüntüleme sistemleri. Verileriniz güvenli yerel sunucularda veya şifreli bulut altyapısında saklanır.",
    microMetrics: ["Gece görüş", "Akıllı analiz", "Merkezi kayıt"],
    visualHint: "lens orb + subtle scan lines",
    features: ["LPR Plaka Tanıma", "İnsan/Araç Ayrımı", "H.265+ Sıkıştırma", "Mobil Uzaktan Erişim"],
    icon: "Eye",
    tags: ["CCTV", "AI", "ANALYTICS"]
  },
  {
    id: "mobil-uygulama",
    title: "Mobil Uygulama Mühendisliği",
    category: "Yazılım",
    oneLiner: "iOS ve Android için native performanslı çözümler.",
    description: "Cross-platform (Flutter/React Native) mobil ekosistemler.",
    longDescription: "Kullanıcı deneyimini merkeze alan, yüksek performanslı mobil uygulamalar. iOS ve Android marketler için optimize edilmiş, offline çalışabilen, biyometrik doğrulama ve push notification altyapısına sahip kurumsal mobil çözümler.",
    microMetrics: ["iOS/Android", "Offline Mod", "Biyometrik"],
    visualHint: "smartphone 3d + floating icons",
    features: ["Cross-Platform", "Store Yönetimi", "Analytics", "Push Bildirim"],
    tags: ["MOBILE", "APP", "NATIVE"],
    icon: "Smartphone"
  },
  {
    id: "hirsiz-alarm",
    title: "Hırsız Alarm Sistemleri",
    category: "Güvenlik",
    oneLiner: "Çevre güvenliği ve ihbar altyapısı.",
    description: "Siber korumalı, kablosuz ve kablolu alarm üniteleri.",
    longDescription: "Çevre bariyerleri, cam kırılma dedektörleri ve hareket sensörleri ile tam kapsamlı koruma. GSM ve IP tabanlı çift yedekli iletişim altyapısı ile internet kesilse bile alarm merkezine veri akışı devam eder.",
    microMetrics: ["Bölge bazlı kurulum", "Mobil bildirim", "Entegrasyon"],
    visualHint: "shield badge + checkmark",
    features: ["Dual-Path İletişim", "Panik Butonu", "Anti-Masking Sensörler", "Siren Entegrasyonu"],
    icon: "ShieldAlert",
    tags: ["SİREN", "ALARM", "MOBİL"]
  },
  {
    id: "fiber",
    title: "Fiber Optic Sistemler",
    category: "Altyapı",
    oneLiner: "Yüksek hız, düşük gecikme, sağlam omurga.",
    description: "Uçtan uca fiber kablolama ve sonlandırma çözümleri.",
    longDescription: "Single-mode ve multi-mode fiber optik altyapılar. Fusion splice sonlandırma, OTDR test ve raporlama hizmetleri ile veri merkezinizi geleceğe hazırlıyoruz. Sıfır kayıplı veri iletimi için profesyonel füzyon sonlandırma.",
    microMetrics: ["OTDR test", "Fusion splice", "Rack düzeni"],
    visualHint: "fiber light beam strand",
    features: ["F/O Sonlandırma", "OTDR Test", "Backbone Tasarımı", "Patch Panel Düzeni"],
    icon: "Waves",
    tags: ["FIBER", "INFRA", "SPEED"]
  },
  {
    id: "network",
    title: "Network Alt Yapı & Kablolama",
    category: "Altyapı",
    oneLiner: "Kurumsal ağ mimarisi, kablolama ve test.",
    description: "Yapısal kablolama ve aktif cihaz yönetimi.",
    longDescription: "Cat6/Cat7 yapısal kablolama, rack kabinet düzenleme ve profesyonel etiketleme. Fluke test ve sertifikasyon süreçleri ile ağınızın performansını garanti altına alıyoruz. Akıllı switch yönetimi ve VLAN yapılandırmaları.",
    microMetrics: ["Cat6/Cat6A", "Patch panel", "Topoloji planlama"],
    visualHint: "node graph + packet dots",
    features: ["Fluke Test", "VLAN Yapılandırma", "Kablo Yönetimi", "Aktif Cihaz Kurulumu"],
    icon: "Network",
    tags: ["IT", "RACK", "LAN"]
  },
  {
    id: "gecis",
    title: "Geçiş Kontrol Sistemleri",
    category: "Güvenlik",
    oneLiner: "Kartlı/biyometrik kontrollü alan yönetimi.",
    description: "Yüksek güvenlikli alanlar için erişim kontrolü.",
    longDescription: "Turnike, bariyer ve manyetik kilit entegrasyonları. Parmak izi, yüz tanıma veya RFID kartlar ile yetkilendirilmiş personel yönetimi. Gerçek zamanlı log raporlama ve PDKS sistemleri ile entegrasyon.",
    microMetrics: ["Turnike entegrasyonu", "Yetkilendirme", "Log raporları"],
    visualHint: "lock badge + scanning beam",
    features: ["Biyometrik Okuyucu", "Merkezi Yönetim", "Anlık Log İzleme", "Ziyaretçi Yönetimi"],
    icon: "Lock",
    tags: ["ACCESS", "BIO", "RFID"]
  },
  {
    id: "ip-santral",
    title: "IP Santral Sistemleri",
    category: "İletişim",
    oneLiner: "VoIP, IVR ve çağrı yönetimi çözümleri.",
    description: "Modern kurumsal haberleşme sistemleri.",
    longDescription: "Analog hatlardan tamamen bağımsız, düşük maliyetli ve yüksek kaliteli VoIP haberleşmesi. Gelişmiş IVR (Sesli Yanıt), çağrı kayıt, mobil dahili entegrasyonu ve video konferans yetenekleri ile kesintisiz iletişim.",
    microMetrics: ["IVR", "Çağrı kayıt", "Uzaktan dahili"],
    visualHint: "voice waveform + call nodes",
    features: ["VoIP/SIP", "Çağrı Kayıt", "IVR Tasarımı", "CRM Entegrasyonu"],
    icon: "PhoneCall",
    tags: ["VOIP", "IVR", "COMM"]
  },
  {
    id: "guc-sarj",
    title: "Güç Kaynağı & Araç Şarj",
    category: "Enerji",
    oneLiner: "Kesintisiz güç ve şarj altyapısı entegrasyonu.",
    description: "Online UPS, regülatör ve EV şarj çözümleri.",
    longDescription: "Sistem odalarınız için kesintisiz güç kaynakları (UPS) ve elektrikli araçlarınız için AC/DC hızlı şarj istasyonları. Enerji verimliliği yüksek, uzaktan izlenebilir akıllı enerji yönetim panelleri.",
    microMetrics: ["UPS seçimi", "Regülasyon", "Devreye alma"],
    visualHint: "energy core + charging bolt",
    features: ["Online UPS", "Statik Regülatör", "EV Şarj İstasyonu", "Yük Dengeleme"],
    icon: "BatteryCharging",
    tags: ["POWER", "EV", "UPS"]
  },
  {
    id: "elektrik-proje",
    title: "Elektrik Mühendislik & Proje",
    category: "Proje",
    oneLiner: "Planlama, projelendirme, uygulama ve denetim.",
    description: "Mühendislik temelli teknik projelendirme hizmetleri.",
    longDescription: "Elektrik iç tesisat projeleri, trafo merkezi tasarımları, ruhsat projeleri ve teknik uygulama kontrollüğü. Yasal mevzuatlara tam uyumlu, keşif ve metraj çalışmalarını kapsayan profesyonel danışmanlık.",
    microMetrics: ["Keşif", "Proje çizim", "Uygulama denetim"],
    visualHint: "blueprint grid + measuring lines",
    features: ["İç Tesisat Proje", "Trafo Tasarımı", "Aydınlatma Hesabı", "Yasal Ruhsat Projesi"],
    icon: "FileText",
    tags: ["PLAN", "PROJE", "ENG"]
  },
  {
    id: "akinsoft",
    title: "Akınsoft Çözüm Ortağı",
    category: "Yazılım",
    oneLiner: "Wolvox ERP, e-Dönüşüm ve Ticari Otomasyon.",
    description: "Yetkili satıcı ve teknik servis hizmetleri.",
    longDescription: "Türkiye'nin yerli yazılım devi Akınsoft'un Wolvox ERP, Muhasebe, İK ve Sektörel çözümlerinin lisanslama, kurulum, eğitim ve teknik destek hizmetlerini sunuyoruz. İşletmenizi dijitalleştirin, verimliliği artırın.",
    microMetrics: ["Wolvox ERP", "e-Dönüşüm", "Lisanslama"],
    visualHint: "akinsoft",
    features: ["ERP & Muhasebe", "Hızlı Kurulum", "Yerinde Eğitim", "7/24 Destek"],
    icon: "AppWindow",
    tags: ["ERP", "YAZILIM", "AKINSOFT"],
    link: "https://www.akinsoft.com.tr"
  }
];

export const INDUSTRIES: Industry[] = [
  { id: 'factory', name: 'Fabrika', description: 'Endüstriyel tesislerde üretim hattı takibi ve çevre güvenliği.', kpi: 'İş Kazası Azaltma: %40', compliance: 'ISO 27001, KVKK' },
  { id: 'hotel', name: 'Otel', description: 'Misafir konforu ve yüksek güvenlikli izleme sistemleri.', kpi: 'Yanıt Süresi: < 30dk', compliance: 'Hizmet Standartları' },
  { id: 'site', name: 'Site / Rezidans', description: 'Geniş alan kontrolü ve otopark plaka tanıma sistemleri.', kpi: '7/24 Aktif İzleme', compliance: 'KVKK Uyumlu' },
  { id: 'office', name: 'Ofis', description: 'Modern çalışma alanları için akıllı network ve iklimlendirme entegrasyonu.', kpi: 'Enerji Tasarrufu: %25', compliance: 'BT Güvenliği' }
];

// PORTFOLIO CONTENT - Modify images here
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-logistics',
    client: 'Global Logistics A.Ş.',
    industry: 'LOJİSTİK & DEPO',
    title: '40.000m² Tam Otomasyonlu Depo Güvenliği',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000',
    stats: [{ label: 'Kamera', value: '350+' }, { label: 'Fiber', value: '5km' }]
  },
  {
    id: 'case-plaza',
    client: 'Tech Plaza Maslak',
    industry: 'KURUMSAL OFİS',
    title: 'Gökdelen Veri Omurgası ve Kartlı Geçiş',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000', 
    stats: [{ label: 'Port', value: '5000+' }, { label: 'Hız', value: '10Gbps' }]
  },
  {
    id: 'case-factory',
    client: 'Mega Factory Endüstri',
    industry: 'AĞIR SANAYİ',
    title: 'Yapay Zeka Destekli İş Güvenliği Sistemi',
    image: 'https://images.unsplash.com/photo-1565514020176-dbf2277cc114?auto=format&fit=crop&q=80&w=2000',
    stats: [{ label: 'AI Analiz', value: '%99.9' }, { label: 'Kaza', value: '%0' }]
  },
  {
    id: 'case-datacenter',
    client: 'Finansbank Veri Merkezi',
    industry: 'BANKACILIK',
    title: 'Tier-IV Standartlarında Sistem Odası',
    image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=2000',
    stats: [{ label: 'Uptime', value: '99.99' }, { label: 'Soğutma', value: 'N+2' }]
  }
];

export const getIcon = (name: string, className: string = "w-6 h-6") => {
  switch (name) {
    case 'Shield': return <Shield className={className} />;
    case 'Network': return <Network className={className} />;
    case 'Eye': return <Eye className={className} />;
    case 'Lock': return <Lock className={className} />;
    case 'Server': return <Server className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Bell': return <Bell className={className} />;
    case 'Waves': return <Waves className={className} />;
    case 'PhoneCall': return <PhoneCall className={className} />;
    case 'BatteryCharging': return <BatteryCharging className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Search': return <Search className={className} />;
    case 'MousePointer2': return <MousePointer2 className={className} />;
    case 'Thermometer': return <Thermometer className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'HardDrive': return <HardDrive className={className} />;
    case 'Wifi': return <Wifi className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'CheckCircle2': return <CheckCircle2 className={className} />;
    case 'Wind': return <Wind className={className} />;
    case 'ZapOff': return <ZapOff className={className} />;
    case 'ClipboardCheck': return <ClipboardCheck className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Code2': return <Code2 className={className} />;
    case 'AppWindow': return <AppWindow className={className} />;
    default: return <Activity className={className} />;
  }
};
