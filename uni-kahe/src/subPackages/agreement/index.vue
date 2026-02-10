<template>
  <view class="agreement">
    <view class="agreement-header">
      <view 
        class="agreement-header-tab" 
        :class="{ active: currentTab === 1 }"
        @click="currentTab = 1"
      >
        用户服务协议
      </view>
      <view 
        class="agreement-header-tab" 
        :class="{ active: currentTab === 2 }"
        @click="currentTab = 2"
      >
        隐私政策
      </view>
    </view>
    <scroll-view 
      class="agreement-content" 
      scroll-y 
      :scroll-top="scrollTop"
      @scroll="handleScroll"
    >
      <view class="agreement-content-inner">
        <rich-text v-if="currentTab === 1" :nodes="userAgreementContent"></rich-text>
        <rich-text v-else :nodes="privacyPolicyContent"></rich-text>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const currentTab = ref(1);
const scrollTop = ref(0);

// 切换tab时回到顶部
watch(currentTab, () => {
  scrollTop.value = 0;
});

const handleScroll = (e: any) => {
  // 处理滚动
};

// 用户服务协议内容
const userAgreementContent = `
<div style="font-size: 14px; line-height: 1.8; color: #333;">
  <h2 style="font-size: 16px; font-weight: bold; margin: 16px 0 12px; color: #333;">卡核服务协议提示条款</h2>
  <p style="margin-bottom: 12px;">欢迎您与卡核经营者(详见定义条款)共同签署本《卡核服务协议》(下称"本协议")并使用卡核服务!各服务条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">「审慎阅读」</h3>
  <p style="margin-bottom: 12px;">您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。如您对协议有任何疑问，可向卡核客服咨询。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">「签约动作」</h3>
  <p style="margin-bottom: 12px;">当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与卡核经营者达成一致，成为卡核"用户"。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">一、定义</h3>
  <p style="margin-bottom: 8px;"><strong>卡核：</strong>指卡核微信小程序(名称为卡核丨手办模玩一番赏)。</p>
  <p style="margin-bottom: 8px;"><strong>卡核经营者：</strong>指经营卡核的各法律主体。卡核经营者可能根据卡核的业务调整而发生变更，目前为佛山市顺德区卡核贸易商行。</p>
  <p style="margin-bottom: 8px;"><strong>卡核服务：</strong>卡核基于互联网，以包含卡核微信小程序等在内的各种形态(包括未来技术发展出现的新的服务形态)向您提供的各项服务。</p>
  <p style="margin-bottom: 8px;"><strong>卡核规则：</strong>包括在所有卡核规则，频道内已经发布及后续发布的全部规则、解读、公告等内容以及卡核经营者在网站、圈子、论坛、个人中心内发布的各类规则、实施细则、产品流程说明、公告等。</p>
  <p style="margin-bottom: 8px;"><strong>关联公司：</strong>除卡核经营者外的单称。</p>
  <p style="margin-bottom: 12px;"><strong>同一用户：</strong>使用同一身份认证信息或经卡核经营者排查认定多个卡核账户的实际控制人为同一人的，均视为同一用户。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">二、协议范围</h3>
  <h4 style="font-size: 14px; font-weight: bold; margin: 12px 0 8px; color: #333;">2.1 签约主体</h4>
  <p style="margin-bottom: 8px;"><strong>「平等主体」</strong>本协议由您与卡核经营者共同缔结，本协议对您与卡核经营者均具有合同效力。</p>
  <p style="margin-bottom: 12px;"><strong>「主体信息」</strong>卡核经营者是指经营卡核的各法律主体。本协议项下，卡核经营者可能根据卡核的业务调整而发生变更，变更后的卡核经营者与您共同履行本协议并向您提供服务，卡核经营者的变更不会影响您本协议项下的权益。卡核经营者还有可能因为提供新的卡核服务而新增。如您使用新增的卡核服务的，视为您同意新增的经营者与您共同履行本协议。发生争议时，您可根据您具体使用的服务及对您权益产生影响的具体行为对象确定与您履约的主体及争议相对方。</p>
  
  <h4 style="font-size: 14px; font-weight: bold; margin: 12px 0 8px; color: #333;">2.2 补充协议</h4>
  <p style="margin-bottom: 12px;">由于互联网高速发展，您与卡核签署的本协议列明的条款并不能完整罗列并覆盖您与卡核所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此,卡核未来新增的协议等均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如有新增协议，卡核将对您进行告知，如您使用卡核服务，视为您同意上述补充协议。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">三、账户注册与使用</h3>
  <h4 style="font-size: 14px; font-weight: bold; margin: 12px 0 8px; color: #333;">3.1 用户资格</h4>
  <p style="margin-bottom: 8px;">您确认，在您开始注册程序使用卡核服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的—切后果。</p>
  <p style="margin-bottom: 12px;">此外，您还需确保您不是任何国家、国际组织或者地域实施的贸易限制、制裁或其他法律、规则限制的对象，否则您可能无法正常注册及使用卡核的服务。</p>
  
  <h4 style="font-size: 14px; font-weight: bold; margin: 12px 0 8px; color: #333;">3.2 账户说明</h4>
  <p style="margin-bottom: 8px;"><strong>「账户获得」</strong>目前卡核使用微信提供的第三方平台账户登陆，您根据登陆时的相关提示填写必要信息后，您将获得卡核账户。卡核只允许每位用户使用—个卡核账户。如有证据证明或卡核经营者根据各类数据规则判断您存在不当注册或不当使用多个卡核账户的情形，卡核经营者可采取冻结或关闭账户、取消订单、拒绝提供服务等措施，如给卡核及相关方造成损失的，您还应承担赔偿责任。</p>
  <p style="margin-bottom: 8px;"><strong>「账户使用」</strong>由于您的卡核账户关联您的个人信息及卡核商业信息，您的账户仅限您本人使用。未经卡核同意，您直接或间接授权第三方使用您卡核账户或获取您账户项下信息的行为无效。如卡核经营者根据卡核规则中约定的违约认定程序及标准判断您卡核账户的使用可能危及您的账户安全及/或卡核信息安全的，卡核经营者可拒绝提供相应服务或终止本协议。</p>
  <p style="margin-bottom: 8px;"><strong>「账户转让」</strong>由于用户账户关联用户信用信息，仅当有法律明文规定、司法裁定或经卡核经营者同意，并符合卡核规则规定的用户账户转让流程的情况下，您可进行账户的转让。您的账户—经转让，该账户项下权利义务—并转移。除此外，您的账户不得以任何方式转让，否则卡核经营者有权追究您的违约责任，且由此产生的—切责任均由您承担。</p>
  <p style="margin-bottom: 12px;"><strong>「实名认证」</strong>作为卡核经营者，为使您更好地使用卡核的各项服务，保障您的账户安全，卡核有权要求您按照我国法律规定完成实名认证。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">四、商品购买规则</h3>
  <p style="margin-bottom: 8px;">1. 本平台的一番赏以"一番赏"形式售卖玩具，供用户购买。</p>
  <p style="margin-bottom: 8px;">2. "一番赏"为计算机软件开赏游戏产品，符合《中华人民共和国消费者权益保护法》第三章，第二十五条，第(三)细则的要求，一经开赏则已拆封，售出不支持退货。</p>
  <p style="margin-bottom: 8px;">3. 所有购买行为请遵守本平台《用户服务协议》，18周岁以下未成年人禁止购买。</p>
  <p style="margin-bottom: 12px;">4. 本平台提倡谨慎判断、理性消费的原则，购买者应对自身所作的消费行为负责。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">五、发货与售后</h3>
  <p style="margin-bottom: 8px;">1. 开赏后的赏品会放进盒柜，您可以到"盒柜"内手动申请发货。</p>
  <p style="margin-bottom: 8px;">2. 请务必确保您填写的默认地址是真实有效的，因您地址错误或其他个人原因导致的任何损失由您自行承担。</p>
  <p style="margin-bottom: 8px;">3. 我们会根据申请发货的先后顺序安排发货，如遇节假日或特殊情况会暂停或延缓发货。</p>
  <p style="margin-bottom: 8px;">4. 发货机制：平台默认使用中通物流，1件即可起发，满5件可享受国内包邮，小于5件需支付10元邮费。</p>
  <p style="margin-bottom: 12px;">5. 商品不支持7天无理由退换货，如有质量问题请联系客服处理。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">六、违约责任</h3>
  <p style="margin-bottom: 12px;">用户出现恶意行为的，我们有权要求其退还因恶意行为获得的额外利益并进行警告，出现两次恶意行为，用户将被拉入黑名单，并冻结平台账户。恶意行为包括但不限于：开箱后无质量问题以各种理由要求退款、欺骗或与他人联合欺骗其他冲赏用户、利用系统BUG恶意冲赏等。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">七、法律适用与争议解决</h3>
  <p style="margin-bottom: 12px;">本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国法律。如法律无相关规定的，参照商业惯例及/或行业惯例。您因使用卡核服务所产生及与卡核服务有关的争议，由卡核与您协商解决。协商不成时，任何一方均可向被告所在地有管辖权的人民法院提起诉讼。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">八、其他</h3>
  <p style="margin-bottom: 8px;">1. 本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。</p>
  <p style="margin-bottom: 8px;">2. 卡核有权根据业务调整情况对本协议进行修改，修改后的协议将在卡核平台公布。</p>
  <p style="margin-bottom: 20px;">3. 本协议最终解释权归卡核所有。</p>
</div>
`;

// 隐私政策内容
const privacyPolicyContent = `
<div style="font-size: 14px; line-height: 1.8; color: #333;">
  <h2 style="font-size: 16px; font-weight: bold; margin: 16px 0 12px; color: #333;">卡核隐私政策</h2>
  <p style="margin-bottom: 12px;">卡核（以下简称"我们"）深知个人信息对您的重要性，我们会尽力保护您的个人信息安全。我们致力于维持您对我们的信任，恪守以下原则保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最小必要原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。</p>
  <p style="margin-bottom: 12px;">请在使用我们的产品或服务前，仔细阅读并了解本《隐私政策》，以便您更好地了解我们如何收集、使用、存储和共享您的个人信息。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">一、我们收集的信息</h3>
  <p style="margin-bottom: 8px;">我们根据合法、正当、必要的原则，仅收集实现产品功能所必要的信息：</p>
  <p style="margin-bottom: 8px;"><strong>1.1 您在使用我们服务时主动提供的信息</strong></p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 您在注册账户时填写的信息，如昵称、头像、手机号码等</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 您在使用服务时上传的信息，如收货地址、联系人信息等</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 您通过我们的客服或参加我们举办的活动时所提交的信息</p>
  
  <p style="margin-bottom: 8px;"><strong>1.2 我们在您使用服务时获取的信息</strong></p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 日志信息：当您使用我们的服务时，我们可能会自动收集相关信息并存储为服务日志信息</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 设备信息：设备型号、操作系统版本、唯一设备标识符等</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 软件信息：软件的版本号、浏览器类型等</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• IP地址</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 服务日志信息：您在使用我们服务时搜索、查看的信息等</p>
  <p style="margin-bottom: 12px; padding-left: 12px;">• 位置信息：指您开启设备定位功能并使用我们基于位置提供的相关服务时，收集的有关您位置的信息</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">二、我们如何使用信息</h3>
  <p style="margin-bottom: 8px;">我们严格遵守法律法规的规定以及与用户的约定，将收集的信息用于以下用途：</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 向您提供我们的各项服务</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 满足您的个性化需求</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 产品开发和服务优化</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 安全保障</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 向您推荐您可能感兴趣的广告、资讯等</p>
  <p style="margin-bottom: 12px; padding-left: 12px;">• 评估、改善我们的广告投放和其他促销及推广活动的效果</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">三、信息共享</h3>
  <p style="margin-bottom: 8px;">目前，我们不会主动共享或转让您的个人信息至第三方，如存在其他共享或转让您的个人信息情形时，我们会征得您的明示同意。</p>
  <p style="margin-bottom: 8px;">我们会对合作方获取信息的软件工具开发包（SDK）进行严格的安全监测，以保护数据安全。我们对接入的相关第三方SDK在目录中列明。</p>
  <p style="margin-bottom: 12px;">请注意，第三方SDK可能因为其版本升级、策略调整等原因导致数据处理类型存在一定变化，请以其公示的官方说明为准。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">四、信息存储与保护</h3>
  <p style="margin-bottom: 8px;"><strong>4.1 信息存储的地点</strong></p>
  <p style="margin-bottom: 8px;">我们会按照法律法规规定，将境内收集的用户个人信息存储于中国境内。</p>
  
  <p style="margin-bottom: 8px;"><strong>4.2 信息存储的期限</strong></p>
  <p style="margin-bottom: 8px;">一般而言，我们仅在为实现目的所必需的时间内保留您的个人信息，例如：</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 手机号码：若您需要使用卡核服务，我们需要一直保存您的手机号码，以保证您正常使用该服务。</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 当您注销账户后，我们将删除您的个人信息或做匿名化处理。</p>
  
  <p style="margin-bottom: 12px;"><strong>4.3 信息安全</strong></p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 我们努力为用户的信息安全提供保障，以防止信息的丢失、不当使用、未经授权访问或披露。</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 我们将在合理的安全水平内使用各种安全保护措施以保障信息的安全。</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 我们建立专门的管理制度、流程和组织以保障信息的安全。</p>
  <p style="margin-bottom: 12px; padding-left: 12px;">• 若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并以推送通知、公告等形式告知您。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">五、您的权利</h3>
  <p style="margin-bottom: 8px;">在您使用卡核服务期间，为了让您更便捷地查询访问、删除、更正您的个人信息，我们在产品设计中为您提供了相应的操作设置，您可参考下面的指引进行操作：</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 查询/访问您的个人信息：您可以在"我的"页面查看您的基本信息</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 更正您的个人信息：您可以在"我的"-"设置"中修改您的个人信息</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 删除您的个人信息：您可以联系客服申请删除您的个人信息</p>
  <p style="margin-bottom: 12px; padding-left: 12px;">• 注销账户：您可以在"设置"中申请注销您的账户</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">六、未成年人保护</h3>
  <p style="margin-bottom: 12px;">我们非常重视对未成年人个人信息的保护。根据相关法律法规的规定，若您是18周岁以下的未成年人，在使用卡核服务前，应事先取得您的家长或法定监护人的书面同意。若您是未成年人的监护人，当您对您所监护的未成年人的个人信息有相关疑问时，请通过本政策公示的联系方式与我们联系。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">七、隐私政策的变更</h3>
  <p style="margin-bottom: 12px;">我们可能会适时对本隐私政策进行修订。当隐私政策的条款发生变更时，我们会在您登录及版本更新时以推送通知、弹窗等形式向您展示变更后的政策。请您注意，只有在您点击弹窗中的同意按钮后，我们才会按照变更后的隐私政策收集、使用、存储您的个人信息。</p>
  
  <h3 style="font-size: 15px; font-weight: bold; margin: 16px 0 8px; color: #333;">八、联系我们</h3>
  <p style="margin-bottom: 8px;">如果您对本隐私政策有任何疑问、意见或建议，或者您想要行使您的个人信息权利，请通过以下方式与我们联系：</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 客服微信：请在"我的"页面联系客服</p>
  <p style="margin-bottom: 8px; padding-left: 12px;">• 客服电话：请在小程序内查看</p>
  <p style="margin-bottom: 20px; padding-left: 12px;">• 公司地址：佛山市顺德区卡核贸易商行</p>
  
  <p style="margin-bottom: 12px; color: #999; font-size: 12px;">本隐私政策于2024年发布，最近更新日期：2024年。</p>
</div>
`;
</script>

<style lang="scss" scoped>
.agreement {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  
  &-header {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1rpx solid #e5e5e5;
    
    &-tab {
      flex: 1;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      font-size: 28rpx;
      color: #666;
      position: relative;
      
      &.active {
        color: #775435;
        font-weight: bold;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60rpx;
          height: 4rpx;
          background-color: #775435;
          border-radius: 2rpx;
        }
      }
    }
  }
  
  &-content {
    flex: 1;
    overflow: hidden;
    
    &-inner {
      padding: 24rpx;
      background-color: #fff;
      min-height: 100%;
    }
  }
}
</style>
