<template>
  <v-card color="surface">
    <v-progress-linear value="100" height="20" class="primary--text"></v-progress-linear>
    
    <v-form>
      <v-container fluid>
        <v-row align="center">
          <v-col cols="6" class="px-8">

            <v-card-title>
              Broker
            </v-card-title>

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
          </v-col>

          <v-col cols="6" class="px-8">

            <v-card-title>
              Contact
            </v-card-title>

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

          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions class="pa-4">
      <v-btn class="primary" @click="submit">
        Submit
      </v-btn>
  
      <v-btn class="secondary" @click="reset">
        Reset
      </v-btn>
    
      <v-btn class="error" @click="populateForm">
        Demo
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import EventBus from '../../helpers/eventBus.js'
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
    }
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
      
      // const splitter = new RegExp(/[\s,]\s*/)
      const regex = new RegExp(/[^a-z_-]+/g)
      const name = String(this.company.value).toLowerCase().replaceAll(' ', '-').replaceAll(regex, '')
      
      const organization = {
        name,
        display_name: this.company.value,
        branding: this.branding,
        metadata: {
          type: 'Broker',
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
        const accesstoken = await this.$auth.getTokenSilently()
        response = await this.$http(accesstoken).post(`/organizations`, organization)
        announcement.text = response?.data?.message
        announcement.type = 'success'
        this.congratulations(organization)
      } catch (error) {
        announcement.type = 'error'
        const exists = error.message == 'Request failed with status code 409'
        announcement.text = exists ? `The organization "${organization.display_name}" is already a broker!` : error.message
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
      this.company.value = 'New Broker'
      this.industry.value = 'Other'
      this.region.value = 'Canada, US',
      this.first.value = 'Aaron'
      this.last.value = 'Wolbach'
      this.email.value = 'aaron.wolbach@okta.com'
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
