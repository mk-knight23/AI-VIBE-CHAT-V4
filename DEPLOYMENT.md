# Deployment Guide

## Pre-Deployment Checklist

✅ All TypeScript errors fixed
✅ Build successful (npm run build)
✅ 30 AI API providers integrated
✅ All pages rendering correctly
✅ API Playground functional

## Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd /Users/mkazi/API_Providers
vercel
```

4. Follow prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **ai-api-providers** (or your choice)
   - Directory? **./** (press Enter)
   - Override settings? **N**

5. Production deployment:
```bash
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard

1. Initialize Git repository:
```bash
cd /Users/mkazi/API_Providers
git init
git add .
git commit -m "Initial commit: 30 AI API providers platform"
```

2. Create GitHub repository:
   - Go to https://github.com/new
   - Name: `ai-api-providers`
   - Make it public or private
   - Don't initialize with README (we have one)

3. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-api-providers.git
git branch -M main
git push -u origin main
```

4. Deploy on Vercel:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Click **Deploy**

## Environment Variables (Optional)

If you want to add default API keys for demo purposes:

```env
NEXT_PUBLIC_OPENAI_KEY=your-key-here
NEXT_PUBLIC_ANTHROPIC_KEY=your-key-here
```

Add these in Vercel Dashboard → Settings → Environment Variables

## Post-Deployment

1. Test all pages:
   - Home: `/`
   - Providers: `/providers`
   - Compare: `/compare`
   - Calculator: `/calculator`
   - Benchmarks: `/benchmarks`
   - Playground: `/playground`
   - Market Overview: `/market-overview`

2. Test API Playground with at least 3 providers

3. Verify all 30 providers are listed

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check `npm run build` locally first
- Ensure all dependencies are in package.json
- Check Node.js version (18+)

### API Calls Fail
- CORS issues: API calls are client-side, should work
- Check API keys are valid
- Verify base URLs are correct

### Pages Not Found
- Ensure all dynamic routes are generated
- Check `generateStaticParams` in [slug]/page.tsx

## Performance Optimization

Already implemented:
- Static page generation
- Image optimization
- Code splitting
- Lazy loading

## Monitoring

- Vercel Analytics: Automatically enabled
- Check deployment logs in Vercel Dashboard
- Monitor API usage in provider dashboards

## Support

For issues:
1. Check Vercel deployment logs
2. Review browser console for errors
3. Test locally with `npm run dev`
