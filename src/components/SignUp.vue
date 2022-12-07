<template>
  <v-card color="surface">
    <v-progress-linear value="100" height="20" class="primary--text"></v-progress-linear>
    
    <v-container>
      <v-row>
        <v-col cols=12>
          <v-card-title>
            Most of our offerings are available to member<br>financial firms only.
          </v-card-title>
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions class="pa-4">
      <v-container>
        <v-row>
          <v-col cols=12>
            <v-card-title>
              Already a member?
            </v-card-title>
            <v-btn class="success" block @click="submit">
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>

    <v-form>
      <v-container fluid>
        <v-row align="center">
          <v-col cols=12 class="px-8">

            <v-card-title>
              Fill out this form to apply for institutional<br>membership.
            </v-card-title>

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

    <v-progress-linear
      :indeterminate="progress.indeterminate"
      :value="progress.value"
      height="20"
      class="primary--text"
    ></v-progress-linear>
    <v-divider></v-divider>

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
        <v-row>
          <v-col cols=12>
            <v-btn class="error" block @click="populateForm">
              Demo
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import EventBus from './../helpers/eventBus.js'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',
  mixins: [ validationMixin ],
  data () {
    return {
      progress: {
        value: 100,
        indeterminate: false,
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
      },
      branding: {
        logo_url: 'https://cdn.svgapi.com/vector/41770/insurance.svg',
        colors: {
          primary: '#1D2578',
          page_background: '#B4B4f0'
        }
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
      const announcement = {
        text: '',
        type: 'info',
        top: true,
        right: true,
        left: false
      }
      if (this.$v.$invalid) {
        announcement.text = 'Please complete the form'
        announcement.type = 'error'
        EventBus.$emit('announce', announcement)
        return
      }
      this.progress.indeterminate = true
      this.progress.value = 0
      
      const splitter = new RegExp(/[\s,]\s*/)
      const organization = {
        name: String(this.company.value.split(splitter)[0]).toLowerCase(),
        display_name: this.company.value,
        branding: this.branding,
        metadata: {
          industry: this.industry.value,
          region: this.region.value,
          how: this.how.value,
          code: this.code.value,
          constent: String(this.consent.value),
          enableMFA: 'false'
        },
        user: {
          given_name: this.first.value,
          family_name: this.last.value,
          email: this.email.value
        }
      }

      let response
      try {
        response = await this.$http(null).post(`/organizations`, organization)
        announcement.text = response?.data?.message
        announcement.type = 'success'
        this.congratulations(organization)
      } catch (error) {
        announcement.type = 'error'
        const exists = error.message == 'Request failed with status code 409'
        announcement.text = exists ? `The organization "${organization.display_name}" is already a member!` : error.message
      }
      
      console.log(response)
      this.progress.indeterminate = false
      this.progress.value = 100
      EventBus.$emit('announce', announcement)
      return response?.data
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
    },
    populateForm () {
      this.$v.$reset()
      this.region.value = 'Canada, US'
      this.industry.value = 'Other'
      this.how.value = 'Other'
      this.company.value = 'Okta, Inc.'
      this.first.value = 'Aaron'
      this.last.value = 'Wolbach'
      this.email.value = 'aaron.wolbach@okta.com'
      this.radioGroup.value = 'Attend FS-ISAC summits and events'
      this.code.value = 'my-special-code'
      this.consent.value = false
    },
    congratulations (organization) {
      const dialog = {
        organization: organization.name,
        email: organization.user.email
      }
      EventBus.$emit('dialog', dialog)
    }
  }
}
</script>
