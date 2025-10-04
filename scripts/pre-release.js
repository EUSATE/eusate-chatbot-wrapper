#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'

console.log('🔍 Running pre-release checks...\n')

let hasErrors = false

// Check 1: Git status clean
console.log('✓ Checking git status...')
try {
  const status = execSync('git status --porcelain').toString()
  if (status) {
    console.error('❌ Git working directory is not clean!')
    console.error('   Commit or stash your changes first.\n')
    hasErrors = true
  } else {
    console.log('  ✅ Git working directory is clean\n')
  }
} catch (error) {
  console.error('❌ Failed to check git status\n')
  hasErrors = true
}

// Check 2: Tests pass (when you add them later)
console.log('✓ Checking tests...')
try {
  // execSync('npm test', { stdio: 'inherit' })
  console.log('  ⏭️  No tests yet (skipping)\n')
} catch (error) {
  console.error('❌ Tests failed!\n')
  hasErrors = true
}

// Check 3: Linting passes
console.log('✓ Running linter...')
try {
  execSync('npm run lint', { stdio: 'inherit' })
  console.log('  ✅ Linting passed\n')
} catch (error) {
  console.error('❌ Linting failed!\n')
  hasErrors = true
}

// Check 4: Type checking passes
console.log('✓ Running type check...')
try {
  execSync('npm run type-check', { stdio: 'inherit' })
  console.log('  ✅ Type check passed\n')
} catch (error) {
  console.error('❌ Type check failed!\n')
  hasErrors = true
}

// Check 5: Build succeeds
console.log('✓ Testing build...')
try {
  execSync('npm run build', { stdio: 'inherit' })
  console.log('  ✅ Build succeeded\n')
} catch (error) {
  console.error('❌ Build failed!\n')
  hasErrors = true
}

// Check 6: Required files exist
console.log('✓ Checking required files...')
const requiredFiles = [
  'dist/eusate-sdk.esm.js',
  'dist/eusate-sdk.min.js',
  'dist/index.d.ts',
  'README.md',
  'CHANGELOG.md',
]

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`)
    hasErrors = true
  }
}
console.log('  ✅ All required files present\n')

// Check 7: CHANGELOG has unreleased section
console.log('✓ Checking CHANGELOG...')
const changelog = readFileSync('CHANGELOG.md', 'utf8')
if (!changelog.includes('## [Unreleased]')) {
  console.warn('⚠️  CHANGELOG.md missing [Unreleased] section')
} else {
  console.log('  ✅ CHANGELOG looks good\n')
}

// Final result
if (hasErrors) {
  console.error(
    '\n❌ Pre-release checks failed! Please fix the errors above.\n',
  )
  process.exit(1)
} else {
  console.log('\n✅ All pre-release checks passed! Ready to release.\n')
  process.exit(0)
}
