<template>
  <v-card>

    <!-- Banner Card -->
    <banner :titles="banner.titles" :texts="banner.texts"></banner>

    <v-card class="pa-6">
      <v-row>
        <v-col cols=6 offset=1>
          <!-- Terms and Conditions Card -->
          <v-card>
            <v-card-title>
              <h1>Don't Fight Cyber Threats Alone</h1>
            </v-card-title>
            <v-card-text>
              
              <v-card-title class="primary--text">Why Join Now?</v-card-title>
              <v-card-text>
                The convergence of nation-state actors and cyber criminals is leading to more well-funded 
                and sophisticated cross-border attacks. The financial system is a prime target.
              </v-card-text>
              <v-card-text>
                Third-party risks remain heightened in a global financial industry with many commonly shared 
                suppliers. Third-party vendors and suppliers performing critical services for financial services 
                firms will continue to be lucrative targets for threat actors.
              </v-card-text>
              <v-card-text>
                Meanwhile, the pandemic has exponentially accelerated digital transformation, making financial 
                services both more interconnected and more competitive. 
              </v-card-text>

              <v-card-title class="primary--text">Why FS-ISAC?</v-card-title>
              <v-card-text>
                FS-ISAC is the industry's trusted hub for cross-border cyber intelligence sharing, enabling firms to 
                pool resources, expertise, and capabilities to better manage cyber risks and incident response.
              </v-card-text>
              <v-card-text>
                Unlike vendor threat feeds, FS-ISAC’s intelligence is from other member financial firms, analyzed, and enriched by our Global Intelligence Office.
              </v-card-text>
              <v-card-text>
                No one firm can stay ahead of all cyber threats. And yet a threat to one firm is a threat to the broader financial system.
              </v-card-text>

              <v-card-title class="primary--text">Benefits​</v-card-title>
              <ul>
                <li>Globally sourced, enriched and actionable industry-specific cyber intelligence</li>
                <li>Support before, during, and after high visibility cyber incidents</li>
                <li>Member-only hands-on-training, exercises, community events including regional briefings, summits and other events</li>
                <li>Access to FS-ISAC Intelligence Exchange platform and apps</li>
                <li>Eligibility for CISO Congress and Threat Intelligence Committee(s)</li>
                <li>Global Intelligence Office regional threat calls</li>
                <li>STIX/TAXII connectivity</li>
              </ul>
              <v-card-text>See the full list of institutional membership benefits here. </v-card-text>

              <v-card-title class="primary--text">Annual Dues</v-card-title>
              <v-card-text>
                Annual dues are determined based on your firm's exposure, informed by criteria such as assets, revenue, assets under management, and clearing customers. 
              </v-card-text>

              <v-card-title class="primary--text">Eligibility</v-card-title>
              <v-card-text>
                Financial firms of the following types are eligible for membership:
              </v-card-text>
            
              <ul>
                <li>Bank & Credit Union</li>
                <li>Core Back Office Supplier</li>
                <li>Critical Utility</li>
                <li>Exchange</li>
                <li>Fintech</li>
                <li>Insurance</li>
                <li>Investments & Securities</li>
                <li>MSSP</li>
                <li>Payments</li>
                <li>Trade Association</li>
              </ul>

              <v-card-text>
                If your firm is NOT a member and you have questions about becoming a member please send an email to membership@fsisac.com.*
                *We can only review submissions with corporate email addresses. 
              </v-card-text>
              <v-card-text>
                If you ARE a member but don't have an Intelligence Exchange account please reach out to your POC or email memberquestions@fsisac.com.
              </v-card-text>
              <v-card-text>
                FS-ISAC members are bound by the Operating Rules, Membership Agreement, and End User License Agreement.
              </v-card-text>
              <v-card-text>
                ****If you are interested in our affiliate program, learn more here.
              </v-card-text>
              <v-card-text>
                In the US, small community-based financial institutions with less than $1 billion in assets may elect to register as a Critical Notification Only Participant (CNOP). 
              </v-card-text>
            </v-card-text>

            <v-divider></v-divider>
          </v-card>
        </v-col>

        <v-col cols=4>
          <sign-up></sign-up>
        </v-col>
      </v-row>

    </v-card>
  </v-card>
</template>

<script>
import Banner from '@/components/Banner.vue'
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'Join',
  metaInfo: {
    title: 'Join Us!',
  },
  components: {
    Banner,
    SignUp
  },
  data () {
    return {
      banner: {
        titles: [
          'Join Financial Firms Around the World',
          'Become an FS-ISAC Member'
        ],
        texts: [
          'The only global cyber intelligence sharing community solely focused on financial services'
        ]
      }
    }
  },
  methods: {}
}
</script>

