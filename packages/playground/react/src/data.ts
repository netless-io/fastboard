import type { InsertDocsDynamic, InsertDocsStatic } from "@netless/fastboard";

export const PDF: InsertDocsStatic = {
  title: "开始使用 Flat.pdf",
  fileType: "pdf",
  scenePath: "/pdf/fddaeb908e0b11ecb94f39bd66b92986",
  scenes: [
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/1.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/2.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/3.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/4.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/5.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/6.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/7.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/8.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/9.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/10.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/11.png",
    },
    {
      height: 972,
      width: 1728,
      conversionFileUrl:
        "https://convertcdn.netless.link/staticConvert/fddaeb908e0b11ecb94f39bd66b92986/12.png",
    },
  ].map((e, i) => {
    return {
      name: `${i + 1}`,
      ppt: {
        width: e.width,
        height: e.height,
        src: e.conversionFileUrl,
      },
    };
  }),
};

export const PPT: InsertDocsDynamic = {
  title: "Get Started with Flat.pptx",
  fileType: "pptx",
  scenePath: "/ppt/feae41208e0b11ecb954e907f43a0c2c",
  taskId: "feae41208e0b11ecb954e907f43a0c2c",
};

export const MP4 = {
  name: "oceans.mp4",
  url: "https://flat-storage.oss-accelerate.aliyuncs.com/cloud-storage/2022-02/15/55509848-5437-463e-b52c-f81d1319c837/55509848-5437-463e-b52c-f81d1319c837.mp4",
};

export const PNG = {
  name: "lena_color.png",
  url: "https://flat-storage.oss-accelerate.aliyuncs.com/cloud-storage/2022-02/15/ebe8320a-a90e-4e03-ad3a-a5dc06ae6eda/ebe8320a-a90e-4e03-ad3a-a5dc06ae6eda.png",
};

export const PNG2 = {
  name: "lena_grey.png",
  url: "https://flat-storage.oss-accelerate.aliyuncs.com/cloud-storage/2022-02/15/8d487d84-e527-4760-aeb6-e13235fd541f/8d487d84-e527-4760-aeb6-e13235fd541f.png",
};
