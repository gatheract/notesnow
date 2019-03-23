<template>
<div>
  <el-select v-on:change="keySelectedHandler" style="max-width: 300px;" :value="keyVal" :placeholder="$t('KeySel.keySignature')">
    <el-option key="None"  :label="$t('KeySel.noKey')" :value="null" ></el-option>      
    <el-option key="Random" style="color: #111" label="Random" :value="RANDOM_KEY">{{$t('KeySel.random')}} <i class='uil uil-dice-four'> </i></el-option>
    <el-option
      v-for="(key, index) in KeySignaturesData"
      :key="index"
      :label="label(index)"
      :value="index">
    </el-option>
  </el-select>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GameType, GameStaff } from '@/Store/Modules/Settings/Types'
import { namespace } from 'vuex-class'
import * as ks from '@/Notation/KeySignatures'
import { Note } from '@/Notation/NoteConstants'
import {getNoteName} from '@/Notation/NoteData'
const settingsModule = namespace('Settings')
import { SET_KEY_SIGNATURE } from '@/Store/Modules/Settings/Actions'
import { KEY_SIGNATURE } from '@/Store/Modules/Settings/Getters'

/**
 * Key signature selection component
 */
@Component({})
export default class KeySel extends Vue {
  @settingsModule.Action(SET_KEY_SIGNATURE)
  private setKeySignature: any
  
  private readonly RANDOM_KEY = '-1'
  @settingsModule.Getter(KEY_SIGNATURE)
  private keyVal: string | null
  
  /**
   * If random is selected choose some random key or
   * the value selected otherwise
   */
  private keySelectedHandler(val: string | null) {
    if (val === this.RANDOM_KEY) {
      const keys = Object.keys(ks.KeySignaturesData) 
      const key = keys[Math.floor((keys.length - 1) * Math.random())]
      this.setKeySignature(key)
    } else {
      this.setKeySignature(val)
    }    
  }
  
  /**
   * Get the string for major and minor key names for a key
   */
  private label(index: ks.KeySignaturesIndex) {
    const major = getNoteName(ks.KeySignaturesData[index].major)
    const minor = getNoteName(ks.KeySignaturesData[index].minor)
    
    let res = major +  ' ' + this.$t('Notation.major') + ' / '
    res += minor +  ' ' + this.$t('Notation.minor')
    return res
  } 
  private data() {
    return {
      GameStaff,
      KeySignaturesData: ks.KeySignaturesData
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>
