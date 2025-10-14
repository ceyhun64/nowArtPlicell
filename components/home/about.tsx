"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function About() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = React.useState("0px");
  const [showButton, setShowButton] = React.useState(false);

  // Sabit içerik paragraflar halinde
  const title = "Hakkımızda";
  const paragraphs = [
    `Bursa ‘da Toptan Zebra ve Plise Kumaş Satışlarımız Başladı! Bursa Küçükbalıklı ‘daki fabrikamızda üreticiden tüketiciye mantığıyla NowArt Mekanik Perde Sistemleri imalatı yapıyoruz. Sektördeki tecrübelerimizle Türkiye’de en düşük fiyatlarla aracısız en iyi kalitede ürünlerimizin satışını sağlıyoruz. Her plise cam balkon perdesi NowArt perde kalitesinde değildir. Üretimi yerinde görmek ve bizleri ziyaret etmek istiyorsanız, Moda Buse Tekstil firmamıza siz değerli müşterimizi bekleriz.`,
    `NowArt Plise Perde Nedir? Işığı Kontrol Altına Alın! NowArt Plise Perde Modelleri pencereden gözünüze vuran ışığı kontrol altına almaya yarıyor. Sürgülü ve kolay kullanımı olduğundan dilediğiniz zaman açıp kapatabilirsiniz. Evinize zarif bir görünüm, şık bir dekorasyon sağlayacaktır. Sipariş sonrası aklınızda montajı nasıl yapabilirim gibi şeyler geliyorsa korkmayın; montaj da kullanımı kadar pratiktir.`,
    `Bursa Plise Perde Fiyatları Açılışa Özel İndirim Başladı! Bursa plise perde fiyatları açılışa özel kampanya kapsamında düzenleniyor. Üreticiden doğrudan tüketiciye mantığıyla aracıları kaldırıyoruz. Ekstra komisyon alan kimse olmadığından siz değerli müşterilerimize en taban fiyattan ulaştırıyoruz. Bu kalitede bu fiyata araştırdığımızda Türkiye’de satan yok! NowArt farkıyla sektördeki tecrübelerimizle en iyi hizmeti Bursa il ve ilçelerinde vermeye başladık.`,
    `Bursa’da Toptan Zebra ve Plise Kumaş Fiyatları? Plise perdelerimiz metre karesi KDV dahil 250 TL’den başlayan fiyatlarla NowArt.com ve Instagram @NowArtperde adreslerinde satışta. Toptan zebra kumaş fiyatları bayilik alan müşterilerimize ekstra indirimler uygulanıyor. Siz de Modabuse Tekstil ailesinin bir üyesi olmak isterseniz bize Whatsapp hattımız üzerinden ulaşabilirsiniz.`,
  ];

  React.useEffect(() => {
    if (contentRef.current) {
      setShowButton(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [paragraphs]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-50 py-6 md:py-24">
      <Card className="max-w-[1400px] w-full mx-auto p-6 md:p-8 shadow-sm border-none font-serif">
        <CardContent className="p-0">
          {/* Başlık */}
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 text-center md:text-left">
            {title}
          </h3>

          {/* İçerik */}
          <div
            ref={contentRef}
            style={{
              maxHeight: isExpanded ? maxHeight : "6rem", // ~3 satır yüksekliği
            }}
            className="text-gray-600 text-base md:text-sm leading-relaxed overflow-hidden transition-[max-height] duration-500 ease-in-out relative"
          >
            {paragraphs.map((p, idx) => (
              <p key={idx} className="mb-4 last:mb-0">
                {p}
              </p>
            ))}

            {/* Gradient efekti */}
            {!isExpanded && showButton && (
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>

          {/* Buton */}
          {showButton && (
            <div className="mt-4 flex justify-start">
              <Button
                variant="link"
                onClick={toggleExpand}
                className="p-0 h-auto text-gray-600 font-semibold hover:text-gray-700 transition-colors"
              >
                {isExpanded ? (
                  <>
                    Daha Az Oku <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Devamını Oku <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
