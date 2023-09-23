<template>
  <div class="wrap">
    <!-- 阅读量，class为固定值 -->
    <div class="statistic" v-show="readingNum">
      <span id="/blog/contact/" class="leancloud_visitors" data-flag-title="联系我">
        <em class="post-meta-item-text">阅读量：</em>
        <i class="leancloud-visitors-count"></i>
      </span>
    </div>
    <!-- 留言板容器 -->
    <div id="com"></div>
  </div>
</template>

<script>
// 使用示例：<bai-comment :readingNum="true"/>
export default {
  name: "bai-comment",
  props: {
    // 是否统计阅读量
    readingNum: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const Valine = require("valine");
      new Valine({
        el: "#com", // 容器ID
        appId: "Uycc9kGTrdbEATzhKnxlkWmo-gzGzoHsz", // "3GiiCyXCrGbOIH3EelCfJ6yw-gzGzoHsz" 官网示例
        appKey: "aHINxMHuhAb4vQxJCuSYzLFe", // "iuneD4hXPQImdHQSRE0aOcRF" 官网示例
        placeholder: "给我留言",
        avatar: "robohash", // 默认头像
        path: `/blog/contact/`, // 文章的路径
        visitor: this.readingNum, // 支持阅读量统计
        recordIP: true, // 记录评论者IP
        lang: "zh-cn", // 或 en
        requiredFields: ["nick"], // 必填项
        // meta: ["nick", "mail", "link"],
      });
    },
  },
};
</script>

<style>
.statistic {
  text-align: right;
}
#com {
  margin-top: 20px;
}
/* 覆盖Valine控件样式 */
.v[data-class="v"] .vcards > .vcard {
  padding-bottom: 10px;
  border-bottom: 1px dashed #e0e0e0;
}
#com.v[data-class="v"] .vwrap,
#com.v[data-class="v"] .vbtn,
#com.v[data-class="v"] .vcards .vcard .vh {
  border-color: #e0e0e0;
}
#com.v[data-class="v"] .vwrap .vheader .vinput {
  border-color: #d0d0d0;
}
#com.v[data-class="v"] .vcards .vcard .vh {
  padding-bottom: 0;
  border-bottom: unset;
}
#com.v[data-class="v"] .vcards .vcard .vquote {
  border-left: unset;
  border-radius: 10px;
  background: rgba(247, 248, 250, 0.9);
}
.v[data-class="v"] .vcards .vcard .vh .vmeta .vat {
  margin-right: 1em;
}
.v[data-class="v"] .vcards .vcard .vquote .vimg {
  background: #fff;
}
</style>
