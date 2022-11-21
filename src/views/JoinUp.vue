<template>
  <v-card>

    <!-- Banner Card -->
    <v-card :dark="!isDark" :light="isDark" >
      <v-img height="250px" :src="otherRibbon">
        <v-container container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col>

              <v-card-title class="justify-center">
                <h1>Join Financial Firms Around the World</h1>
              </v-card-title>
              <v-card-title class="justify-center">
                <h1>Become an FS-ISAC Member</h1>
              </v-card-title>
              <v-card-text class="text-center">
                  The only global cyber intelligence sharing community solely focused on financial services
              </v-card-text>

            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-card>

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
          <v-card color="surface">
            <v-progress-linear value="100" height="20" class="primary--text"></v-progress-linear>
            <v-card-title>
              Fill out this form to apply for institutional membership. 
              Most of our offerings are available to member financial firms only.
            </v-card-title>

            <v-form v-model="valid" ref="form" lazy-validation>
              <v-container fluid>
                <v-row align="center">
                  <v-col cols=12 class="px-8">

                    <label>{{ region.hint }}</label>
                    <v-select
                      v-model="region.value"
                      :items="region.items"
                      :label="region.label"
                      :rules="region.rules"
                      outlined
                      required
                    ></v-select>

                    <div v-if="region.value != null">
                      <label>{{ contact.company.hint }}</label>
                      <v-text-field
                        outlined
                        :label="contact.company.label"
                        v-model="contact.company.value"
                        :rules="contact.company.rules"
                      ></v-text-field>

                      <label>{{ contact.first.hint }}</label>
                      <v-text-field
                        outlined
                        :label="contact.first.label"
                        v-model="contact.first.value"
                        :rules="contact.first.rules"
                      ></v-text-field>

                      <label>{{ contact.last.hint }}</label>
                      <v-text-field
                        outlined
                        :label="contact.last.label"
                        v-model="contact.last.value"
                        :rules="contact.last.rules"
                      ></v-text-field>

                      <label>{{ contact.email.hint }}</label>
                      <v-text-field
                        outlined
                        :label="contact.email.label"
                        v-model="contact.email.value"
                        :rules="contact.email.rules"
                      ></v-text-field>

                    </div>

                    <label>{{ industry.hint }}</label>
                    <v-select
                      :items="industry.items"
                      :label="industry.label"
                      :rules="industry.rules"
                      outlined
                      required
                    ></v-select>

                    <label>{{ how.hint }}</label>
                    <v-select
                      :items="how.items"
                      :label="how.label"
                      :rules="how.rules"
                      outlined
                      required
                    ></v-select>

                    <label>{{ radioGroup.hint }}</label>
                    <v-radio-group v-model="radioGroup.value">
                      <v-radio
                        v-for="(radio, index) in radioGroup.items"
                        :rules="radio.rules"
                        :key="index"
                        :label="radio"
                        :value="radio"
                      ></v-radio>
                    </v-radio-group>

                    <label>{{ code.hint }}</label>
                    <v-text-field
                      outlined
                      :label="code.label"
                      v-model="code.value"
                    ></v-text-field>

                    <p>
                      FS-ISAC is committed to protecting and respecting your privacy, and we will only use your personal 
                      information to administer your account and to provide the products and services you requested from 
                      us. From time to time, we would like to contact you about our products and services, as well as 
                      other content that may be of interest to you. If you consent to us contacting you for this purpose, 
                      please tick the box below.
                    </p>

                    <v-checkbox
                      v-model="consent.value"
                      :label="consent.label"
                    ></v-checkbox>

                    <p>
                      You can unsubscribe from these communications at any time. For more information on how to unsubscribe,
                       our privacy practices, and how we are committed to protecting and respecting your privacy, please 
                       review our Privacy Policy.
                    </p>
                    <p>
                      By clicking submit below, you consent to allow FS-ISAC to store and process the personal information 
                      submitted above to provide you the content requested.
                    </p>

                  </v-col>
                </v-row>
              </v-container>
            </v-form>

            <v-card-actions class="pa-4">
              <v-btn class="primary" block @click="submit">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'Join',
  metaInfo: {
    title: 'Join Us!',
  },
  data () {
    return {
      valid: false,
      region: {
        items: [
          'Asia Pacific',
          'Canada, US',
          'Europe, UK, Middle East, Africa',
          'Latin America'
        ],
        hint: 'Region',
        label: 'Please Select',
        value: null,
        rules: [
          v => !!v || 'Please complete this required field.'
        ]
      },
      industry: {
        items: [
          'Bank, Credit Union',
          'Core Back Office Supplier',
          'Critical Utility, Exchange',
          'Insurance',
          'MSSP',
          'Payments',
          'Regulator',
          'Central Bank',
          'CERT',
          'Trade Association',
          'Securities & Investments',
          'Other'
        ],
        hint: 'Industry Type',
        label: 'Please Select',
        value: null,
        rules: [
          v => !!v || 'Please complete this required field.'
        ]
      },
      contact: {
        company: {
          hint: 'Company Name',
          label: '',
          value: '',
          rules: [
            v => !!v || 'Please complete this required field.'
          ]
        },
        first: {
          hint: 'First Name',
          label: '',
          value: '',
          rules: [
            v => !!v || 'Name is required'
          ]
        },
        last: {
          hint: 'Last Name',
          label: '',
          value: '',
          rules: [
            v => !!v || 'Name is required'
          ]
        },
        email: {
          hint: 'Email Address',
          label: '',
          value: '',
          rules: [
            v => !!v || 'E-mail is required',
            v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v) || 'E-mail must be valid',
          ]
        }
      },
      how: {
        items: [
          'FS-ISAC employee',
          'FS-ISAC exercise',
          'FS-ISAC marketing email',
          'FS-ISAC speaker at a conference',
          'Peer recommendation',
          'Press article, blog post',
          'Regulator recommendation',
          'Search engine query (Google, DuckDuckGo, Bing, etc.)',
          'Social media (e.g. LinkedIn, Twitter)',
          'Other'
        ],
        hint: 'How did you hear about FS-ISAC?',
        label: 'Please Select',
        value: null,
        rules: [
          v => !!v || 'Please complete this required field.'
        ]
      },
      radioGroup: {
        value: '',
        hint: 'What is the primary reason you are interested in joining FS-ISAC?',
        items: [
          'Attend FS-ISAC summits and events',
          'Connect with industry-specific peers',
          'Participate in exercises, hands-on training',
          'Receive critical cyber-intelligence specific to financial services',
          'Satisfy regulatory recommendation'
        ],
        rules: [
          v => !!v|| 'Please select an option'
        ]
      },
      code: {
        hint: 'Relationship Code',
        label: '',
        value: ''
      },
      consent: {
        label: 'I agree to receive member communications from FS-ISAC.',
        value: false
      }
    }
  },
  methods: {
    async submit () {
      const isValid = this.validate()
      const organization = {
        name: this.contact.company.value,
        display_name: this.contact.company.value,
        metadata: {
          industry: this.industry.value,
          region: this.region.value,
          how: this.how.value,
          code: this.code.value,
          constent: this.consent.value
        }
      }

      const json = JSON.stringify(organization, null, 2)
      alert(`form is${isValid ? ' ' : ' NOT '}valid`)
      alert(`submit new organiation\n${json}`)
    },
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  }
}
</script>