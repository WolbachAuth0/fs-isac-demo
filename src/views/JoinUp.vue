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
                      :error-messages="regionErrors"
                      @change="$v.region.value.$touch()"
                      @blur="$v.region.value.$touch()"
                      outlined
                      required
                    ></v-select>

                    <div v-if="region.value !== ''">
                      <label>{{ company.hint }}</label>
                      <v-text-field
                        :label="company.label"
                        v-model="company.value"
                        :counter="company.maxLength"
                        :error-messages="companyErrors"
                        @input="$v.company.value.$touch()"
                        @blur="$v.company.value.$touch()"
                        outlined
                        required
                      ></v-text-field>

                      <label>{{ first.hint }}</label>
                      <v-text-field
                        :label="first.label"
                        v-model="first.value"
                        :counter="first.maxLength"
                        :error-messages="firstErrors"
                        @input="$v.first.value.$touch()"
                        @blur="$v.first.value.$touch()"
                        outlined
                        required
                      ></v-text-field>

                      <label>{{ last.hint }}</label>
                      <v-text-field
                        :label="last.label"
                        v-model="last.value"
                        :counter="last.maxLength"
                        :error-messages="lastErrors"
                        @input="$v.last.value.$touch()"
                        @blur="$v.last.value.$touch()"
                        outlined
                        required
                      ></v-text-field>

                      <label>{{ email.hint }}</label>
                      <v-text-field
                        :label="email.label"
                        v-model="email.value"
                        :error-messages="emailErrors"
                        @input="$v.email.value.$touch()"
                        @blur="$v.email.value.$touch()"
                        outlined
                        required
                      ></v-text-field>
                    </div>

                    <label>{{ industry.hint }}</label>
                    <v-select
                      v-model="industry.value"
                      :items="industry.items"
                      :label="industry.label"
                      :error-messages="industryErrors"
                      @change="$v.industry.value.$touch()"
                      @blur="$v.industry.value.$touch()"
                      outlined
                      required
                    ></v-select>

                    <label>{{ how.hint }}</label>
                    <v-select
                      v-model="how.value"
                      :items="how.items"
                      :label="how.label"
                      :error-messages="howErrors"
                      @change="$v.how.value.$touch()"
                      @blur="$v.how.value.$touch()"
                      outlined
                      required
                    ></v-select>

                    <label>{{ radioGroup.hint }}</label>
                    <v-radio-group v-model="radioGroup.value">
                      <v-radio
                        v-for="(radio, index) in radioGroup.items"
                        :key="index"
                        :label="radio"
                        :value="radio"
                      ></v-radio>
                    </v-radio-group>

                    <label>{{ code.hint }}</label>
                    <v-text-field
                      :label="code.label"
                      v-model="code.value"
                      outlined
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
              <v-container>
              <v-row>
                <v-col cols=12>
                  <v-btn class="primary" block @click="submit">
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols=12>
                  <v-btn class="secondary" block @click="reset">
                    Reset
                  </v-btn>
                </v-col>
              </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-card>
  </v-card>
</template>

<script>
import Banner from '@/components/Banner.vue'
import EventBus from './../helpers/eventBus.js'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Join',
  metaInfo: {
    title: 'Join Us!',
  },
  components: {
    Banner
  },
  mixins: [ validationMixin ],
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
      },
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
        value: '',
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
        value: '',
      },
      company: {
        hint: 'Company Name',
        label: '',
        value: '',
        minLength: 3,
        maxLength: 30
      },
      first: {
        hint: 'First Name',
        label: '',
        value: '',
        maxLength: 10
      },
      last: {
        hint: 'Last Name',
        label: '',
        value: '',
        maxLength: 30
      },
      email: {
        hint: 'Email Address',
        label: '',
        value: '',
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
        value: '',
      },
      radioGroup: {
        value: null,
        hint: 'What is the primary reason you are interested in joining FS-ISAC?',
        items: [
          'Attend FS-ISAC summits and events',
          'Connect with industry-specific peers',
          'Participate in exercises, hands-on training',
          'Receive critical cyber-intelligence specific to financial services',
          'Satisfy regulatory recommendation'
        ],
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
  validations: {
    region: { value: { required } },
    industry: { value: { required } },
    how: { value: { required } },
    company: {
      value: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
      }
    },
    first: {
      value: {
        required,
        maxLength: maxLength(10)
      }
    },
    last: {
      value: {
        required,
        maxLength: maxLength(30)
      }
    },
    email: {
      value: { required, email }
    },
    radioGroup: {
      value: { required },
    },
    code: {},
    consent: {}
  },
  computed: {
    regionErrors () {
      const validator = this.$v.region.value
      return this.selectErrors(validator)
    },
    industryErrors () {
      const validator = this.$v.industry.value
      return this.selectErrors(validator)
    },
    howErrors () {
      const validator = this.$v.how.value
      return this.selectErrors(validator)
    },
    companyErrors () {
      const validator = this.$v.company.value
      const context = this.company
      return this.inputErrors(validator, context)
    },
    firstErrors () {
      const validator = this.$v.first.value
      const context = this.first
      return this.inputErrors(validator, context)
    },
    lastErrors () {
      const validator = this.$v.last.value
      const context = this.last
      return this.inputErrors(validator, context)
    },
    emailErrors () {
      const validator = this.$v.email.value
      const errors = []
      if (!validator.$dirty) return errors
      !validator.email && errors.push('Must be valid email')
      !validator.required && errors.push('Email is required')
      return errors
    },
  },
  methods: {
    async submit () {
      this.$v.$touch()
      const isValid = !this.$v.$invalid
      console.log(isValid)
      const organization = {
        name: this.company.value,
        display_name: this.company.value,
        metadata: {
          industry: this.industry.value,
          region: this.region.value,
          how: this.how.value,
          code: this.code.value,
          constent: this.consent.value
        }
      }

      const json = JSON.stringify(organization, null, 2)

      const announcement = {
        text: `form is${isValid ? ' ' : ' NOT '}valid. <br><br>${json}`,
        type: isValid ? 'success' : 'error',
        top: true,
        right: true,
        left: false
      }
      EventBus.$emit('announce', announcement)
    },
    inputErrors (validator, context) {
      const errors = []
      if (!validator.$dirty) return errors
      if (context.minLength) {
        !validator.minLength && errors.push(`${context.hint} must be at least ${context.minLength} characters long.`)
      }
      if (context.maxLength) {
        !validator.maxLength && errors.push(`${context.hint} must be at most ${context.maxLength} characters long.`)
      }
      !validator.required && errors.push(`${context.hint} is required.`)
      return errors
    },
    selectErrors (validator) {
      const errors = []
      if (!validator.$dirty) return errors
      !validator.required && errors.push('Please complete this required field.')
      return errors
    },
    reset () {
      this.$v.$reset()
      this.region.value = ''
      this.industry.value = ''
      this.how.value = ''
      this.company.value = ''
      this.first.value = ''
      this.last.value = ''
      this.email.value = ''
      this.radioGroup.value = null
      this.code.value = ''
      this.consent.value = false
    }
  }
}
</script>