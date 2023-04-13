import React from "react";

function AboutUs() {
  return (
    <>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              Biz Kimiz
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">
              Zillow, sadece emlak sektörüne odaklanmış, müşterilerine ilan
              yayınlama ve katma değerli servis hizmetleri veren, Türkiye’nin
              gayrimenkul özelinde alım, satım, kiralama ve reklam platformudur.
              Zillow’a masaüstü web sitesi ile birlikte, mobil web sitesi, iOS,
              android ve Huawei cihazlarınızın uygulama mağazalarından
              indireceğiniz mobil uygulamalarla da erişebilir, tüm soru ve
              önerileriniz için çağrı merkezimizi haftanın 7 günü 09:00 - 21:00
              saatleri arasında +90 (212) 381 31 50 nolu hattan arayabilirsiniz.
            </p>
          </div>
          <div className="w-full lg:w-8/12 ">
            <img
              className="w-full h-full"
              src="https://wp-tid.zillowstatic.com/bedrock/app/uploads/sites/5/2022/08/ZG_ZPA_08_21_Americana_ExtFront_1081_1440_desktopWebp-2.webp"
              alt="A group of People"
            />
          </div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              Ailemiz
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">
              Ülkenin dört köşesine yayılan saha ekibimiz ve 200 kişiden büyük
              bir takımla hem emlak arayanlar hem de profesyonel ve bireysel
              ilan verenlerin hayatını kolaylaştıracak teknoloji çözümleri
              sunmak için var gücümüzle çalışıyoruz. Global zincirlerden, kobi
              ölçeğindeki tüm emlak ofislerine kadar, her seviyedeki iş
              ortağımızın ihtiyaçlarına özel sunduğumuz üyelik paketlerimiz ve
              ek hizmetlerimizle sektörün her seviyesine hizmet verirken,
              değerimizin karşılığını fazlasıyla vermeyi amaçlıyoruz. Gelişmiş
              raporlama hizmetlerimiz ve Akıllı Hat servisimizle üyelerimizin
              işlerini değerli veri kaynaklarıyla destekliyor, iş planlamalarına
              katkı sağlıyoruz.
            </p>
          </div>
          <div className="w-full lg:w-8/12 lg:pt-8">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden"
                  src="https://media.licdn.com/dms/image/D4D03AQHxlMa57O2nnA/profile-displayphoto-shrink_800_800/0/1673457388276?e=1686787200&v=beta&t=pdVe2UGrVkwmCwCP3NJFVb_8KTDwddpB3f80pA8pDHY"
                  alt="Alexa featured Img"
                />
                <img
                  className="md:hidden block"
                  src="https://media.licdn.com/dms/image/D4D03AQHxlMa57O2nnA/profile-displayphoto-shrink_800_800/0/1673457388276?e=1686787200&v=beta&t=pdVe2UGrVkwmCwCP3NJFVb_8KTDwddpB3f80pA8pDHY"
                  alt="Alexa featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  Enes
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden"
                  src="https://i.hizliresim.com/5d9oepm.jpg"
                  alt="Olivia featured Img"
                />
                <img
                  className="md:hidden block"
                  src="https://i.hizliresim.com/5d9oepm.jpg"
                  alt="Olivia featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  Serhat
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden"
                  src="https://media.licdn.com/dms/image/C4D03AQFlvYKYU5PfXA/profile-displayphoto-shrink_800_800/0/1662852842876?e=1686787200&v=beta&t=WwNT-Yd67BEMn4_sxTEq84fZAdxxk9-0-vc7PwR6bJY"
                  alt="Liam featued Img"
                />
                <img
                  className="md:hidden block"
                  src="https://media.licdn.com/dms/image/C4D03AQFlvYKYU5PfXA/profile-displayphoto-shrink_800_800/0/1662852842876?e=1686787200&v=beta&t=WwNT-Yd67BEMn4_sxTEq84fZAdxxk9-0-vc7PwR6bJY"
                  alt="Liam featued Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  Ciga
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden"
                  src="https://media.licdn.com/dms/image/C5603AQHCal4PJzB7gA/profile-displayphoto-shrink_800_800/0/1579437616535?e=1686787200&v=beta&t=0IZluic9DpJjsFcxP2M91WthJ0Ygz1Ew1_mG11beHp4"
                  alt="Elijah featured img"
                />
                <img
                  className="md:hidden block"
                  src="https://media.licdn.com/dms/image/C5603AQHCal4PJzB7gA/profile-displayphoto-shrink_800_800/0/1579437616535?e=1686787200&v=beta&t=0IZluic9DpJjsFcxP2M91WthJ0Ygz1Ew1_mG11beHp4"
                  alt="Elijah featured img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                  Paşa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
